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

    protected static ?string $navigationGroup = 'Billing';

    protected static ?string $recordTitleAttribute = 'quotation_number';

    public static function getGloballySearchableAttributes(): array
    {
        return ['quotation_number', 'client.name', 'company', 'name', 'email'];
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
                            
                        Grid::make(3)
                            ->schema([
                                Forms\Components\DatePicker::make('issue_date')
                                    ->default(now())
                                    ->required(),
                                Forms\Components\DatePicker::make('expiry_date')
                                    ->default(now()->addDays(7))
                                    ->required(),
                            ]),
                    ]),

                Section::make('Client Information')
                    ->icon('heroicon-o-user')
                    ->description('Client contact details')
                    ->collapsible()
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Forms\Components\TextInput::make('name')
                                    ->label('Contact Person')
                                    ->required(),
                                Forms\Components\TextInput::make('company')
                                    ->label('Company Name'),
                                Forms\Components\TextInput::make('email')
                                    ->email()
                                    ->required(),
                                Forms\Components\TextInput::make('phone')
                                    ->tel(),
                                Forms\Components\Textarea::make('address')
                                    ->rows(2)
                                    ->columnSpanFull(),
                            ]),
                    ]),

                Section::make('Service Request Details')
                    ->icon('heroicon-o-clipboard-document-list')
                    ->description('Details from the quotation request form')
                    ->collapsible()
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Forms\Components\TextInput::make('service')
                                    ->label('Service Requested'),
                                Forms\Components\TextInput::make('project_type'),
                                Forms\Components\TextInput::make('budget')
                                    ->label('Budget Range'),
                                Forms\Components\TextInput::make('timeline'),
                                Forms\Components\TextInput::make('urgency'),
                                Forms\Components\TextInput::make('preferred_contact_method'),
                                Forms\Components\TextInput::make('reference')
                                    ->url()
                                    ->label('Reference URL'),
                                Forms\Components\Toggle::make('agree_to_terms')
                                    ->label('Agreed to Terms')
                                    ->disabled()
                                    ->dehydrated(false),
                            ]),
                        Forms\Components\Textarea::make('project_description')
                            ->label('Project Description')
                            ->rows(4)
                            ->columnSpanFull(),
                        Forms\Components\Textarea::make('additional_details')
                            ->label('Additional Details')
                            ->rows(3)
                            ->columnSpanFull(),
                    ]),

                Section::make('Line Items')
                    ->icon('heroicon-o-list-bullet')
                    ->schema([
                        Repeater::make('items')
                            ->relationship()
                            ->schema([
                                Forms\Components\Textarea::make('description')
                                    ->required()
                                    ->columnSpan(4),
                                Forms\Components\TextInput::make('quantity')
                                    ->numeric()
                                    ->default(1)
                                    ->required()
                                    ->columnSpan(2)
                                    ->live()
                                    ->afterStateUpdated(function ($state, Get $get, Set $set) {
                                        $set('amount', $state * $get('unit_price'));
                                    }),
                                Forms\Components\TextInput::make('unit_price')
                                    ->numeric()
                                    ->default(0)
                                    ->required()
                                    ->columnSpan(2)
                                    ->live()
                                    ->afterStateUpdated(function ($state, Get $get, Set $set) {
                                        $set('amount', $state * $get('quantity'));
                                    }),
                                Forms\Components\TextInput::make('amount')
                                    ->numeric()
                                    ->default(0)
                                    ->disabled()
                                    ->dehydrated()
                                    ->columnSpan(2),
                            ])
                            ->columns(10)
                            ->defaultItems(0)
                            ->live()
                            ->afterStateUpdated(function (Get $get, Set $set) {
                                self::updateTotals($get, $set);
                            }),
                    ]),

                Section::make('Totals')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Forms\Components\Group::make()
                                    ->schema([
                                        Forms\Components\Textarea::make('notes')
                                            ->rows(3),
                                        Forms\Components\Textarea::make('terms')
                                            ->rows(3),
                                        Forms\Components\Textarea::make('banking_details')
                                            ->rows(3)
                                            ->default("Bank: FNB\nAccount Name: Realnet Web Solutions\nAccount Number: 6303888883\nBranch Code: 250655"),
                                    ]),
                                Forms\Components\Group::make()
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
                                            ->afterStateUpdated(function (Get $get, Set $set) {
                                                self::updateTotals($get, $set);
                                            }),
                                        Forms\Components\TextInput::make('tax_amount')
                                            ->numeric()
                                            ->prefix('R')
                                            ->readOnly(),
                                        Forms\Components\TextInput::make('total_amount')
                                            ->numeric()
                                            ->prefix('R')
                                            ->readOnly()
                                            ->extraInputAttributes(['class' => 'text-xl font-bold']),
                                    ]),
                            ]),
                    ]),
            ]);
    }

    public static function updateTotals(Get $get, Set $set): void
    {
        $items = $get('items');
        $subtotal = 0;

        if ($items) {
            foreach ($items as $item) {
                $subtotal += ($item['quantity'] * $item['unit_price']);
            }
        }

        $taxRate = $get('tax_rate') ?? 0;
        $taxAmount = $subtotal * ($taxRate / 100);
        $total = $subtotal + $taxAmount;

        $set('subtotal', number_format($subtotal, 2, '.', ''));
        $set('tax_amount', number_format($taxAmount, 2, '.', ''));
        $set('total_amount', number_format($total, 2, '.', ''));
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('quotation_number')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('name')
                    ->label('Contact Person')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('company')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('service')
                    ->label('Service')
                    ->badge()
                    ->color('primary'),
                Tables\Columns\TextColumn::make('total_amount')
                    ->money('ZAR')
                    ->sortable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'draft' => 'gray',
                        'sent' => 'info',
                        'accepted' => 'success',
                        'rejected' => 'danger',
                        'invoiced' => 'warning',
                    }),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'sent' => 'Sent',
                        'accepted' => 'Accepted',
                        'rejected' => 'Rejected',
                        'invoiced' => 'Invoiced',
                    ]),
                Tables\Filters\SelectFilter::make('service')
                    ->options([
                        'Website Development' => 'Website Development',
                        'Mobile App Development' => 'Mobile App Development',
                        'Software Development' => 'Software Development',
                        'Hosting & Business Email' => 'Hosting & Business Email',
                        'E-Commerce Solution' => 'E-Commerce Solution',
                        'UI/UX Design' => 'UI/UX Design',
                        'Digital Marketing' => 'Digital Marketing',
                    ]),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('convertToInvoice')
                    ->label('Convert to Invoice')
                    ->icon('heroicon-o-document-currency-dollar')
                    ->color('warning')
                    ->requiresConfirmation()
                    ->visible(fn (Quotation $record) => $record->status === 'accepted' && $record->items()->count() > 0)
                    ->action(function (Quotation $record) {
                        // Logic to convert to invoice would go here
                        // For now just update status
                        $record->update(['status' => 'invoiced']);
                        
                        // You would typically redirect to the create invoice page 
                        // pre-filled with this quotation's data
                    }),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
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
