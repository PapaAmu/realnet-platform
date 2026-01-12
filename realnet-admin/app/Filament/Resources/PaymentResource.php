<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PaymentResource\Pages;
use App\Models\Payment;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Grouping;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Section;
use Illuminate\Support\Facades\Log;

class PaymentResource extends Resource
{
    protected static ?string $model = Payment::class;

    protected static ?string $navigationIcon = 'heroicon-o-banknotes';

    protected static ?string $cluster = \App\Filament\Clusters\Billing::class;

    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Payment Information')
                    ->icon('heroicon-o-banknotes')
                    ->description('Payment details and transaction information')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                        Forms\Components\Select::make('invoice_id')
                            ->relationship('invoice', 'invoice_number')
                            ->required()
                            ->searchable()
                            ->preload(),
                        Forms\Components\Select::make('client_id')
                            ->relationship('client', 'name')
                            ->searchable()
                            ->preload(),
                        Forms\Components\DatePicker::make('payment_date')
                            ->required()
                            ->default(now()),
                        Forms\Components\TextInput::make('amount')
                            ->numeric()
                            ->prefix('R')
                            ->required(),
                        Forms\Components\Select::make('payment_method')
                            ->options([
                                'bank_transfer' => 'Bank Transfer / EFT',
                                'eft' => 'EFT',
                                'cash' => 'Cash',
                                'card' => 'Card Payment',
                                'paypal' => 'PayPal',
                                'other' => 'Other',
                            ])
                            ->required()
                            ->default('bank_transfer'),
                        Forms\Components\TextInput::make('transaction_reference')
                            ->label('Transaction Reference'),
                    ]),
                        Forms\Components\Textarea::make('notes')
                            ->label('Payment Notes')
                            ->rows(3)
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('payment_number')
                    ->label('Payment #')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->icon('heroicon-o-banknotes')
                    ->copyable()
                    ->copyMessage('Payment number copied!')
                    ->copyMessageDuration(1500),
                Tables\Columns\TextColumn::make('invoice.invoice_number')
                    ->label('Invoice #')
                    ->searchable()
                    ->sortable()
                    ->url(fn ($record) => route('filament.admin.billing.resources.invoices.edit', $record->invoice_id)),
                Tables\Columns\TextColumn::make('client.name')
                    ->label('Client')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('payment_date')
                    ->date()
                    ->sortable(),
                Tables\Columns\TextColumn::make('amount')
                    ->money('ZAR')
                    ->sortable()
                    ->weight('bold')
                    ->icon('heroicon-o-currency-dollar')
                    ->color('success'),
                Tables\Columns\TextColumn::make('payment_method')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'bank_transfer' => 'Bank Transfer',
                        'eft' => 'EFT',
                        'cash' => 'Cash',
                        'card' => 'Card',
                        'paypal' => 'PayPal',
                        default => ucfirst($state),
                    }),
                Tables\Columns\TextColumn::make('transaction_reference')
                    ->label('Reference')
                    ->searchable()
                    ->toggleable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('payment_method')
                    ->options([
                        'bank_transfer' => 'Bank Transfer',
                        'eft' => 'EFT',
                        'cash' => 'Cash',
                        'card' => 'Card',
                        'paypal' => 'PayPal',
                        'other' => 'Other',
                    ]),
            ])
            ->actions([
                Tables\Actions\Action::make('receipt')
                    ->label('Receipt')
                    ->icon('heroicon-o-document-text')
                    ->url(fn ($record) => route('payment.receipt', $record))
                    ->openUrlInNewTab(),
                Tables\Actions\Action::make('send_receipt')
                    ->label('Send Receipt')
                    ->icon('heroicon-o-paper-airplane')
                    ->color('info')
                    ->button()
                    ->size('sm')
                    ->requiresConfirmation()
                    ->modalHeading('Send Receipt to Client')
                    ->modalDescription(fn (Payment $record) => "Send payment receipt {$record->payment_number} to client?")
                    ->modalSubmitActionLabel('Send Receipt')
                    ->action(function (Payment $record) {
                        // Get client email
                        $email = $record->invoice?->email ?? $record->client?->email;
                        $name = $record->invoice?->name ?? $record->client?->name ?? 'Valued Client';
                        
                        if (!$email) {
                            \Filament\Notifications\Notification::make()
                                ->title('No Email Found')
                                ->warning()
                                ->body("Could not find an email address for this payment. Please add an email to the invoice or client record.")
                                ->send();
                            return;
                        }

                        // Generate PDF
                        try {
                            $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('payments.receipt', ['payment' => $record]);

                            // Send email notification to client
                            \Illuminate\Support\Facades\Mail::send('emails.payment-confirmation', [
                                'payment' => $record,
                            ], function ($message) use ($email, $name, $record, $pdf) {
                                $message->to($email, $name)
                                    ->subject('Payment Receipt ' . $record->payment_number . ' from RealNet Web Solutions')
                                    ->attachData($pdf->output(), 'Receipt-' . $record->payment_number . '.pdf', [
                                        'mime' => 'application/pdf',
                                    ]);
                            });

                            \Filament\Notifications\Notification::make()
                                ->title('Receipt Sent Successfully')
                                ->success()
                                ->body("Payment receipt {$record->payment_number} has been sent to {$email} with PDF attachment.")
                                ->send();
                        } catch (\Exception $e) {
                            \Filament\Notifications\Notification::make()
                                ->title('Failed to Send Receipt')
                                ->danger()
                                ->body("Error: " . $e->getMessage() . ". Please check your email configuration.")
                                ->send();
                            Log::error('Failed to send payment receipt: ' . $e->getMessage(), [
                                'payment_id' => $record->id,
                                'email' => $email,
                            ]);
                        }
                    }),
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('payment_date', 'desc')
            ->groups([
                Grouping\Group::make('payment_date')
                    ->label('Payment Date')
                    ->date()
                    ->collapsible(),
                Grouping\Group::make('payment_method')
                    ->label('Payment Method')
                    ->collapsible(),
            ])
            ->defaultGroup('payment_date')
            ->poll('30s');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPayments::route('/'),
            'create' => Pages\CreatePayment::route('/create'),
            'edit' => Pages\EditPayment::route('/{record}/edit'),
            // 'view' => Pages\ViewPayment::route('/{record}'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::whereDate('payment_date', today())->count();
    }

    public static function getNavigationBadgeColor(): string|array|null
    {
        return 'success';
    }
}
