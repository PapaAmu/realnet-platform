<?php

namespace App\Filament\Resources;

use App\Filament\Resources\QuotationResource\Pages;
use App\Models\Quotation;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Grouping;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Log;

class QuotationResource extends Resource
{
    protected static ?string $model = Quotation::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-currency-dollar';

    protected static ?string $cluster = \App\Filament\Clusters\Billing::class;

    protected static ?string $recordTitleAttribute = 'quotation_number';

    public static function getGloballySearchableAttributes(): array
    {
        return ['quotation_number', 'client.name', 'company'];
    }

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Quotation Details')
                    ->icon('heroicon-o-document-currency-dollar')
                    ->description('Basic quotation information and status')
                    ->schema([
                        Grid::make(3)
                            ->schema([
                                Forms\Components\TextInput::make('quotation_number')
                                    ->label('Quotation #')
                                    ->disabled()
                                    ->dehydrated()
                                    ->placeholder('Auto-generated'),
                                Forms\Components\Select::make('client_id')
                                    ->relationship('client', 'name')
                                    ->searchable()
                                    ->preload()
                                    ->live()
                                    ->afterStateUpdated(function ($state, Set $set) {
                                        if ($state) {
                                            $client = \App\Models\Client::with('contacts')->find($state);
                                            if ($client) {
                                                // Company is the Client Name
                                                $set('company', $client->name);
                                                
                                                // Name is the Contact Person (Primary Contact, or first contact, or Client Name)
                                                $primaryContact = $client->contacts->where('is_primary', true)->first();
                                                if (!$primaryContact) {
                                                    $primaryContact = $client->contacts->first();
                                                }
                                                $contactName = $primaryContact ? $primaryContact->name : $client->name;
                                                $set('name', $contactName);
                                                
                                                $set('email', $client->email);
                                                $set('phone', $client->phone);
                                                
                                                // Format Address
                                                $addressParts = array_filter([
                                                    $client->address,
                                                    $client->city,
                                                    $client->state,
                                                    $client->zip,
                                                    $client->country
                                                ]);
                                                $set('address', implode(', ', $addressParts));
                                            }
                                        }
                                    }),
                                Forms\Components\Select::make('status')
                                    ->options([
                                        'draft' => 'Draft',
                                        'sent' => 'Sent',
                                        'accepted' => 'Accepted',
                                        'rejected' => 'Rejected',
                                        'invoiced' => 'Converted to Invoice',
                                    ])
                                    ->required()
                                    ->default('draft')
                                    ->native(false)
                                    ->searchable(),
                            ]),
                        Grid::make(2)
                            ->schema([
                                Forms\Components\DatePicker::make('issue_date')
                                    ->default(now())
                                    ->required(),
                                Forms\Components\DatePicker::make('expiry_date')
                                    ->default(now()->addDays(30))
                                    ->required(),
                            ]),
                    ]),

                Section::make('Client Information')
                    ->icon('heroicon-o-user-group')
                    ->description('Client contact and billing details')
                    ->collapsible()
                    ->collapsed()
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Forms\Components\TextInput::make('name')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('email')
                                    ->email()
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('phone')
                                    ->tel()
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('company')
                                    ->label('Company / Client')
                                    ->maxLength(255),
                                Forms\Components\Textarea::make('address')
                                    ->rows(2)
                                    ->columnSpanFull(),
                            ]),
                    ]),

                Section::make('Line Items')
                    ->icon('heroicon-o-list-bullet')
                    ->description('Add products or services to this quotation')
                    ->schema([
                        Repeater::make('items')
                            ->relationship()
                            ->schema([
                                Forms\Components\TextInput::make('description')
                                    ->required()
                                    ->columnSpan(3),
                                Forms\Components\TextInput::make('quantity')
                                    ->numeric()
                                    ->default(1)
                                    ->required()
                                    ->live()
                                    ->afterStateUpdated(fn (Get $get, Set $set) => self::updateLineTotal($get, $set))
                                    ->columnSpan(1),
                                Forms\Components\TextInput::make('unit_price')
                                    ->numeric()
                                    ->default(0)
                                    ->required()
                                    ->live()
                                    ->afterStateUpdated(fn (Get $get, Set $set) => self::updateLineTotal($get, $set))
                                    ->columnSpan(1),
                                Forms\Components\TextInput::make('amount')
                                    ->numeric()
                                    ->disabled()
                                    ->dehydrated()
                                    ->columnSpan(1),
                            ])
                            ->columns(6)
                            ->live()
                            ->afterStateUpdated(fn (Get $get, Set $set) => self::updateTotals($get, $set)),
                    ]),

                Section::make('Totals')
                    ->icon('heroicon-o-calculator')
                    ->description('Financial summary and calculations')
                    ->schema([
                        Grid::make(3)
                            ->schema([
                                Forms\Components\TextInput::make('subtotal')
                                    ->numeric()
                                    ->prefix('R')
                                    ->readOnly(),
                                Forms\Components\TextInput::make('tax_rate')
                                    ->label('Tax Rate (%)')
                                    ->numeric()
                                    ->default(0)
                                    ->live()
                                    ->afterStateUpdated(fn (Get $get, Set $set) => self::updateTotals($get, $set)),
                                Forms\Components\TextInput::make('tax_amount')
                                    ->numeric()
                                    ->prefix('R')
                                    ->readOnly(),
                            ]),
                        Forms\Components\TextInput::make('total_amount')
                            ->label('Grand Total')
                            ->numeric()
                            ->prefix('R')
                            ->readOnly()
                            ->extraInputAttributes(['class' => 'text-xl font-bold']),
                    ]),

                Section::make('Terms & Notes')
                    ->icon('heroicon-o-document-text')
                    ->description('Additional information, terms, and banking details')
                    ->collapsible()
                    ->collapsed()
                    ->schema([
        Forms\Components\Textarea::make('notes')
            ->label('Notes for Client')
            ->rows(3),

        Forms\Components\Textarea::make('terms')
            ->label('Terms & Conditions')
            ->default("1. Valid for 30 days.\n2. 50% deposit required to start.\n3. Balance due upon completion.")
            ->rows(3),

        Forms\Components\Textarea::make('banking_details')
            ->label('Banking Details')
            ->default("BANK NAME: Standard Bank\nAccount holder: REALNET WEB SOLUTIONS\nAccount type: CURRENT\nAccount number: 10231694243\nBranch code: 051001\nSWIFT code: SBZA ZA JJ")
            ->rows(6),
    ]),
]);

    }

    public static function updateLineTotal(Get $get, Set $set): void
    {
        $quantity = (float) ($get('quantity') ?? 0);
        $price = (float) ($get('unit_price') ?? 0);
        $amount = round($quantity * $price, 2);
        $set('amount', number_format($amount, 2, '.', ''));
    }

    public static function updateTotals(Get $get, Set $set): void
    {
        $items = $get('items');
        $subtotal = 0;

        if ($items) {
            foreach ($items as $item) {
                // Calculate amount directly from quantity and unit_price to ensure accuracy
                // This avoids issues with formatted strings or missing amounts
                $quantity = (float) ($item['quantity'] ?? 0);
                $unitPrice = (float) ($item['unit_price'] ?? 0);
                $lineAmount = $quantity * $unitPrice;
                $subtotal += $lineAmount;
            }
        }

        // Round subtotal to 2 decimal places to avoid floating point precision issues
        $subtotal = round($subtotal, 2);
        $set('subtotal', number_format($subtotal, 2, '.', ''));
        
        // Calculate tax amount
        $taxRate = (float) ($get('tax_rate') ?? 0);
        $taxAmount = round($subtotal * ($taxRate / 100), 2);
        $set('tax_amount', number_format($taxAmount, 2, '.', ''));
        
        // Calculate grand total (subtotal + tax)
        $totalAmount = round($subtotal + $taxAmount, 2);
        $set('total_amount', number_format($totalAmount, 2, '.', ''));
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('quotation_number')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->icon('heroicon-o-document-text')
                    ->copyable()
                    ->copyMessage('Quotation number copied!')
                    ->copyMessageDuration(1500),
                Tables\Columns\TextColumn::make('client.name')
                    ->label('Client')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('issue_date')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('total_amount')
                    ->money('ZAR')
                    ->sortable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->icon(fn (string $state): string => match ($state) {
                        'draft' => 'heroicon-o-pencil',
                        'sent' => 'heroicon-o-paper-airplane',
                        'accepted' => 'heroicon-o-check-circle',
                        'rejected' => 'heroicon-o-x-circle',
                        'invoiced' => 'heroicon-o-arrow-right-circle',
                        default => 'heroicon-o-document',
                    })
                    ->color(fn (string $state): string => match ($state) {
                        'draft' => 'gray',
                        'sent' => 'info',
                        'accepted' => 'success',
                        'rejected' => 'danger',
                        'invoiced' => 'primary',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'draft' => 'Draft',
                        'sent' => 'Sent',
                        'accepted' => 'Accepted',
                        'rejected' => 'Rejected',
                        'invoiced' => 'Invoiced',
                        default => $state,
                    }),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'sent' => 'Sent',
                        'accepted' => 'Accepted',
                        'rejected' => 'Rejected',
                        'invoiced' => 'Invoiced',
                    ]),
            ])
            ->actions([
                Tables\Actions\Action::make('convert_to_invoice')
                    ->label('Convert to Invoice')
                    ->icon('heroicon-o-arrow-right-circle')
                    ->color('success')
                    ->button()
                    ->size('sm')
                    ->visible(fn ($record) => $record->status === 'accepted' && !$record->quotation_id)
                    ->requiresConfirmation()
                    ->action(function (Quotation $record) {
                        // Create invoice from quotation
                        $invoice = \App\Models\Invoice::create([
                            'quotation_id' => $record->id,
                            'client_id' => $record->client_id,
                            'name' => $record->name,
                            'email' => $record->email,
                            'phone' => $record->phone,
                            'company' => $record->company,
                            'issue_date' => now(),
                            'due_date' => now()->addDays(30),
                            'status' => 'sent',
                            'subtotal' => $record->subtotal,
                            'tax_rate' => $record->tax_rate,
                            'tax_amount' => $record->tax_amount,
                            'total_amount' => $record->total_amount,
                            'amount_due' => $record->total_amount,
                            'notes' => $record->notes,
                            'terms' => $record->terms,
                            'banking_details' => $record->banking_details,
                        ]);

                        // Copy items
                        foreach ($record->items as $item) {
                            $invoice->items()->create([
                                'description' => $item->description,
                                'quantity' => $item->quantity,
                                'unit_price' => $item->unit_price,
                                'amount' => $item->amount,
                            ]);
                        }

                        // Update quotation status
                        $record->status = 'invoiced';
                        $record->save();

                        \Filament\Notifications\Notification::make()
                            ->title('Invoice Created')
                            ->success()
                            ->body("Invoice #{$invoice->invoice_number} has been created.")
                            ->send();

                        return redirect()->route('filament.admin.billing.resources.invoices.edit', $invoice);
                    }),
                Tables\Actions\Action::make('send_quotation')
                    ->label('Send Quotation')
                    ->icon('heroicon-o-paper-airplane')
                    ->color('info')
                    ->button()
                    ->size('sm')
                    ->requiresConfirmation()
                    ->modalHeading('Send Quotation to Client')
                    ->modalDescription(fn (Quotation $record) => "Send quotation {$record->quotation_number} to {$record->email}?")
                    ->modalSubmitActionLabel('Send Quotation')
                    ->action(function (Quotation $record) {
                        // Validate email
                        if (empty($record->email)) {
                            \Filament\Notifications\Notification::make()
                                ->title('Email Required')
                                ->danger()
                                ->body('Please add an email address to the quotation before sending.')
                                ->send();
                            return;
                        }

                        // Generate PDF
                        try {
                            $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('quotations.print', ['quotation' => $record]);

                            // Send email notification to client
                            \Illuminate\Support\Facades\Mail::send('emails.quotation', [
                                'quotation' => $record,
                            ], function ($message) use ($record, $pdf) {
                                $message->to($record->email, $record->name)
                                    ->subject('Quotation ' . $record->quotation_number . ' from RealNet Web Solutions')
                                    ->attachData($pdf->output(), 'Quotation-' . $record->quotation_number . '.pdf', [
                                        'mime' => 'application/pdf',
                                    ]);
                            });

                            // Update status to sent if it was draft
                            if ($record->status === 'draft') {
                                $record->update(['status' => 'sent']);
                            }

                            \Filament\Notifications\Notification::make()
                                ->title('Quotation Sent Successfully')
                                ->success()
                                ->body("Quotation {$record->quotation_number} has been sent to {$record->email} with PDF attachment.")
                                ->send();
                        } catch (\Exception $e) {
                            \Filament\Notifications\Notification::make()
                                ->title('Failed to Send Quotation')
                                ->danger()
                                ->body("Error: " . $e->getMessage() . ". Please check your email configuration.")
                                ->send();
                            Log::error('Failed to send quotation: ' . $e->getMessage(), [
                                'quotation_id' => $record->id,
                                'email' => $record->email,
                            ]);
                        }
                    }),
                Tables\Actions\Action::make('print')
                    ->label('Print / PDF')
                    ->icon('heroicon-o-printer')
                    ->url(fn (Quotation $record) => route('quotation.print', $record))
                    ->openUrlInNewTab(),
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc')
            ->groups([
                Grouping\Group::make('status')
                    ->label('Status')
                    ->collapsible(),
                Grouping\Group::make('issue_date')
                    ->label('Issue Date')
                    ->date()
                    ->collapsible(),
            ])
            ->defaultGroup('status')
            ->poll('30s');
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListQuotations::route('/'),
            'create' => Pages\CreateQuotation::route('/create'),
            'view' => Pages\ViewQuotation::route('/{record}'),
            'edit' => Pages\EditQuotation::route('/{record}/edit'),
        ];
    }
}