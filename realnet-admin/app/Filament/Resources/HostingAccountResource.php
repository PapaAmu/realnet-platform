<?php

namespace App\Filament\Resources;

use App\Filament\Clusters\Services;
use App\Filament\Resources\HostingAccountResource\Pages;
use App\Filament\Resources\HostingAccountResource\RelationManagers;
use App\Models\HostingAccount;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Grid;

class HostingAccountResource extends Resource
{
    protected static ?string $model = HostingAccount::class;

    protected static ?string $cluster = Services::class;

    protected static ?string $navigationIcon = 'heroicon-o-server';

    protected static ?string $recordTitleAttribute = 'domain_name';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Account Information')
                    ->schema([
                        Grid::make(3)
                            ->schema([
                                Forms\Components\Select::make('client_id')
                                    ->relationship('client', 'name')
                                    ->required()
                                    ->searchable()
                                    ->preload(),
                                Forms\Components\TextInput::make('domain_name')
                                    ->required()
                                    ->maxLength(255)
                                    ->placeholder('example.com'),
                                Forms\Components\Select::make('service_type')
                                    ->options([
                                        'web_hosting' => 'Web Hosting',
                                        'email_hosting' => 'Email Hosting',
                                        'domain_registration' => 'Domain Registration',
                                        'maintenance' => 'Maintenance Retainer',
                                        'vps' => 'VPS',
                                        'other' => 'Other',
                                    ])
                                    ->required(),
                            ]),
                        Grid::make(3)
                            ->schema([
                                Forms\Components\Select::make('status')
                                    ->options([
                                        'active' => 'Active',
                                        'suspended' => 'Suspended',
                                        'cancelled' => 'Cancelled',
                                        'pending' => 'Pending',
                                    ])
                                    ->required()
                                    ->default('active')
                                    ->native(false),
                                Forms\Components\TextInput::make('provider')
                                    ->placeholder('e.g. Hetzner'),
                                Forms\Components\TextInput::make('server_ip')
                                    ->label('Server IP'),
                            ]),
                        Grid::make(2)
                                ->schema([
                                    Forms\Components\TextInput::make('control_panel_url')
                                        ->label('Control Panel URL')
                                        ->url()
                                        ->prefix('https://'),
                                    Forms\Components\TextInput::make('username'),
                                ]),
                    ]),
                
                Section::make('Billing & Dates')
                    ->schema([
                        Grid::make(3)
                            ->schema([
                                Forms\Components\DatePicker::make('activation_date'),
                                Forms\Components\DatePicker::make('next_renewal_date')
                                    ->required(),
                                Forms\Components\Select::make('billing_cycle')
                                    ->options([
                                        'monthly' => 'Monthly',
                                        'quarterly' => 'Quarterly',
                                        'yearly' => 'Yearly',
                                    ])
                                    ->required()
                                    ->default('yearly'),
                                Forms\Components\TextInput::make('price')
                                    ->numeric()
                                    ->prefix('R')
                                    ->default(0.00),
                            ]),
                    ]),
                
                Section::make('Notes')
                    ->schema([
                        Forms\Components\Textarea::make('notes')
                            ->rows(3),
                    ])
                    ->collapsible(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('client.name')
                    ->searchable()
                    ->sortable()
                    ->wrap(),
                Tables\Columns\TextColumn::make('domain_name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->copyable(),
                Tables\Columns\TextColumn::make('service_type')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'web_hosting' => 'Web Hosting',
                        'email_hosting' => 'Email Hosting',
                        'domain_registration' => 'Domain',
                        'maintenance' => 'Maintenance',
                        default => ucfirst(str_replace('_', ' ', $state)),
                    }),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'active' => 'success',
                        'suspended' => 'warning',
                        'cancelled' => 'danger',
                        'pending' => 'gray',
                    }),
                Tables\Columns\TextColumn::make('next_renewal_date')
                    ->date()
                    ->sortable()
                    ->color(fn ($record) => $record->next_renewal_date && $record->next_renewal_date < now()->addDays(30) ? 'warning' : 'success'),
                Tables\Columns\TextColumn::make('billing_cycle')
                    ->badge()
                    ->color('gray'),
                Tables\Columns\TextColumn::make('price')
                    ->money('ZAR')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'active' => 'Active',
                        'suspended' => 'Suspended',
                        'cancelled' => 'Cancelled',
                        'pending' => 'Pending',
                    ]),
                Tables\Filters\SelectFilter::make('service_type')
                    ->options([
                        'web_hosting' => 'Web Hosting',
                        'email_hosting' => 'Email Hosting',
                        'domain_registration' => 'Domain Registration',
                        'maintenance' => 'Maintenance Retainer',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
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
            RelationManagers\TasksRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListHostingAccounts::route('/'),
            'create' => Pages\CreateHostingAccount::route('/create'),
            'edit' => Pages\EditHostingAccount::route('/{record}/edit'),
        ];
    }
}
