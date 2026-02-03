<?php

namespace App\Filament\Resources;

use App\Filament\Resources\InvoiceResource\Pages;
use App\Filament\Resources\InvoiceResource\RelationManagers;
use App\Models\Invoice;
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
use Illuminate\Support\Facades\Log;

class InvoiceResource extends Resource
{
    protected static ?string $model = Invoice::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-check';

    protected static ?string $navigationGroup = 'Billing';



    protected static ?string $recordTitleAttribute = 'invoice_number';

    public static function getGloballySearchableAttributes(): array
    {
        return ['invoice_number', 'client.name', 'company'];
    }

    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Invoice Details')
                    ->icon('heroicon-o-document-check')
                    ->description('Basic invoice information and status')
                    ->schema([
                        Grid::make(3)
                            ->schema([
                                Forms\Components\TextInput::make('invoice_number')
                                    ->label('Invoice #')
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
                                        'partially_paid' => 'Partially Paid',
                                        'paid' => 'Paid',
                                        'overdue' => 'Overdue',
                                        'cancelled' => 'Cancelled',
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
                                Forms\Components\DatePicker::make('due_date')
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
                                    ->maxLength(255)
                                    ->helperText('Email address for sending invoice'),
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
                    ->description('Add products or services to this invoice')
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
                        Grid::make(3)
                            ->schema([
                                Forms\Components\TextInput::make('total_amount')
                                    ->label('Total Amount')
                                    ->numeric()
                                    ->prefix('R')
                                    ->readOnly(),
                                Forms\Components\TextInput::make('amount_paid')
                                    ->label('Amount Paid')
                                    ->numeric()
                                    ->prefix('R')
                                    ->readOnly()
                                    ->helperText('Updated automatically when payments are recorded.'),
                                Forms\Components\TextInput::make('amount_due')
                                    ->label('Amount Due')
                                    ->numeric()
                                    ->prefix('R')
                                    ->readOnly()
                                    ->extraInputAttributes(['class' => 'text-xl font-bold']),
                            ]),
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
                            ->default("Payment due within 30 days.\nLate payments may incur interest charges.")
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
        
        // Calculate amount due (total - paid)
        $amountPaid = (float) ($get('amount_paid') ?? 0);
        $amountDue = round($totalAmount - $amountPaid, 2);
        $set('amount_due', number_format($amountDue, 2, '.', ''));
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('invoice_number')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->icon('heroicon-o-document-text')
                    ->copyable()
                    ->copyMessage('Invoice number copied!')
                    ->copyMessageDuration(1500),
                Tables\Columns\TextColumn::make('client.name')
                    ->label('Client')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('issue_date')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('due_date')
                    ->date()
                    ->sortable()
                    ->color(fn ($record) => $record->isOverdue() ? 'danger' : null),
                Tables\Columns\TextColumn::make('total_amount')
                    ->money('ZAR')
                    ->sortable(),
                Tables\Columns\TextColumn::make('amount_due')
                    ->label('Due')
                    ->money('ZAR')
                    ->sortable()
                    ->weight('bold')
                    ->icon(fn ($state) => $state > 0 ? 'heroicon-o-exclamation-circle' : 'heroicon-o-check-circle')
                    ->color(fn ($state) => $state > 0 ? 'warning' : 'success'),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->icon(fn (string $state): string => match ($state) {
                        'draft' => 'heroicon-o-pencil',
                        'sent' => 'heroicon-o-paper-airplane',
                        'partially_paid' => 'heroicon-o-banknotes',
                        'paid' => 'heroicon-o-check-circle',
                        'overdue' => 'heroicon-o-exclamation-triangle',
                        'cancelled' => 'heroicon-o-x-circle',
                        default => 'heroicon-o-document',
                    })
                    ->color(fn (string $state): string => match ($state) {
                        'draft' => 'gray',
                        'sent' => 'info',
                        'partially_paid' => 'warning',
                        'paid' => 'success',
                        'overdue' => 'danger',
                        'cancelled' => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'draft' => 'Draft',
                        'sent' => 'Sent',
                        'partially_paid' => 'Partially Paid',
                        'paid' => 'Paid',
                        'overdue' => 'Overdue',
                        'cancelled' => 'Cancelled',
                        default => $state,
                    }),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'sent' => 'Sent',
                        'partially_paid' => 'Partially Paid',
                        'paid' => 'Paid',
                        'overdue' => 'Overdue',
                        'cancelled' => 'Cancelled',
                    ]),
            ])
            ->actions([
                Tables\Actions\Action::make('record_payment')
                    ->label('Record Payment')
                    ->icon('heroicon-o-banknotes')
                    ->color('success')
                    ->button()
                    ->size('sm')
                    ->visible(fn ($record) => $record->amount_due > 0)
                    ->fillForm(fn (Invoice $record): array => [
                        'amount' => $record->amount_due,
                        'payment_date' => now(),
                        'payment_method' => 'bank_transfer',
                    ])
                    ->form([
                        Forms\Components\Grid::make(2)
                            ->schema([
                                Forms\Components\DatePicker::make('payment_date')
                                    ->label('Payment Date')
                                    ->required(),
                                Forms\Components\TextInput::make('amount')
                                    ->label('Amount')
                                    ->numeric()
                                    ->prefix('R')
                                    ->required(),
                                Forms\Components\Select::make('payment_method')
                                    ->label('Payment Method')
                                    ->options([
                                        'bank_transfer' => 'Bank Transfer / EFT',
                                        'eft' => 'EFT',
                                        'cash' => 'Cash',
                                        'card' => 'Card Payment',
                                        'paypal' => 'PayPal',
                                        'other' => 'Other',
                                    ])
                                    ->required(),
                                Forms\Components\TextInput::make('transaction_reference')
                                    ->label('Transaction Reference')
                                    ->helperText('Payment reference or transaction ID'),
                            ]),
                        Forms\Components\Textarea::make('notes')
                            ->label('Payment Notes')
                            ->rows(2)
                            ->columnSpanFull(),
                    ])
                    ->action(function (Invoice $record, array $data) {
                        // Validate payment amount
                        $paymentAmount = (float) $data['amount'];
                        if ($paymentAmount <= 0) {
                            \Filament\Notifications\Notification::make()
                                ->title('Invalid Amount')
                                ->danger()
                                ->body('Payment amount must be greater than zero.')
                                ->send();
                            return;
                        }

                        if ($paymentAmount > $record->amount_due) {
                            \Filament\Notifications\Notification::make()
                                ->title('Amount Exceeds Due')
                                ->warning()
                                ->body('Payment amount exceeds the amount due. Please verify.')
                                ->send();
                        }

                        $payment = $record->payments()->create([
                            'client_id' => $record->client_id,
                            'payment_date' => $data['payment_date'],
                            'amount' => $paymentAmount,
                            'payment_method' => $data['payment_method'],
                            'transaction_reference' => $data['transaction_reference'] ?? null,
                            'notes' => $data['notes'] ?? null,
                        ]);

                        // Auto-update invoice status
                        $record->updatePaymentStatus();

                        // Auto-send receipt if email is available
                        $email = $record->email ?? $record->client?->email;
                        if ($email && $record->status === 'paid') {
                            try {
                                $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('payments.receipt', ['payment' => $payment]);
                                \Illuminate\Support\Facades\Mail::send('emails.payment-confirmation', [
                                    'payment' => $payment,
                                ], function ($message) use ($email, $record, $payment, $pdf) {
                                    $message->to($email, $record->name)
                                        ->subject('Payment Receipt ' . $payment->payment_number . ' from RealNet')
                                        ->attachData($pdf->output(), 'Receipt-' . $payment->payment_number . '.pdf', [
                                            'mime' => 'application/pdf',
                                        ]);
                                });
                            } catch (\Exception $e) {
                                // Log error but don't fail the payment
                                Log::error('Failed to send payment receipt: ' . $e->getMessage());
                            }
                        }

                        \Filament\Notifications\Notification::make()
                            ->title('Payment Recorded')
                            ->success()
                            ->body("Payment of R" . number_format($paymentAmount, 2) . " has been recorded. " . 
                                   ($record->status === 'paid' ? 'Invoice is now fully paid!' : 
                                    ($record->status === 'partially_paid' ? 'Invoice is partially paid.' : '')))
                            ->send();
                    }),
                Tables\Actions\Action::make('send_invoice')
                    ->label('Send Invoice')
                    ->icon('heroicon-o-paper-airplane')
                    ->color('info')
                    ->button()
                    ->size('sm')
                    ->requiresConfirmation()
                    ->modalHeading('Send Invoice to Client')
                    ->modalDescription(fn (Invoice $record) => "Send invoice {$record->invoice_number} to {$record->email}?")
                    ->modalSubmitActionLabel('Send Invoice')
                    ->action(function (Invoice $record) {
                        // Validate email
                        if (empty($record->email)) {
                            \Filament\Notifications\Notification::make()
                                ->title('Email Required')
                                ->danger()
                                ->body('Please add an email address to the invoice before sending.')
                                ->send();
                            return;
                        }

                        // Generate PDF
                        try {
                            $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('invoices.print', ['invoice' => $record]);

                            // Send email notification to client
                            \Illuminate\Support\Facades\Mail::send('emails.invoice', [
                                'invoice' => $record,
                            ], function ($message) use ($record, $pdf) {
                                $message->to($record->email, $record->name)
                                    ->subject('Invoice ' . $record->invoice_number . ' from RealNet Web Solutions')
                                    ->attachData($pdf->output(), 'Invoice-' . $record->invoice_number . '.pdf', [
                                        'mime' => 'application/pdf',
                                    ]);
                            });

                            // Update status to sent if it was draft
                            if ($record->status === 'draft') {
                                $record->update(['status' => 'sent']);
                            }

                            \Filament\Notifications\Notification::make()
                                ->title('Invoice Sent Successfully')
                                ->success()
                                ->body("Invoice {$record->invoice_number} has been sent to {$record->email} with PDF attachment.")
                                ->send();
                        } catch (\Exception $e) {
                            \Filament\Notifications\Notification::make()
                                ->title('Failed to Send Invoice')
                                ->danger()
                                ->body("Error: " . $e->getMessage() . ". Please check your email configuration.")
                                ->send();
                            Log::error('Failed to send invoice: ' . $e->getMessage(), [
                                'invoice_id' => $record->id,
                                'email' => $record->email,
                            ]);
                        }
                    }),
                Tables\Actions\Action::make('print')
                    ->label('Print / PDF')
                    ->icon('heroicon-o-printer')
                    ->color('gray')
                    ->url(fn (Invoice $record) => route('invoice.print', $record))
                    ->openUrlInNewTab(),
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
            RelationManagers\PaymentsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListInvoices::route('/'),
            'create' => Pages\CreateInvoice::route('/create'),
            'edit' => Pages\EditInvoice::route('/{record}/edit'),
        ];
    }
}
