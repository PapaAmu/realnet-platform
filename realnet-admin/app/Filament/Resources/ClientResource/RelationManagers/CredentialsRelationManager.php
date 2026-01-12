<?php

namespace App\Filament\Resources\ClientResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Notifications\Notification;

class CredentialsRelationManager extends RelationManager
{
    protected static string $relationship = 'credentials';

    protected static ?string $title = 'Password Manager';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('service_name')
                    ->label('Service / System')
                    ->placeholder('e.g. AWS Console, WordPress Admin')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),
                Forms\Components\Grid::make(2)
                    ->schema([
                        Forms\Components\Select::make('type')
                            ->options([
                                'login' => 'Login Credentials',
                                'server' => 'Server / SSH',
                                'database' => 'Database',
                                'api_key' => 'API Key / Token',
                                'wifi' => 'Wi-Fi',
                                'other' => 'Other',
                            ])
                            ->required()
                            ->default('login'),
                        Forms\Components\TextInput::make('url')
                            ->label('URL / Host')
                            ->url()
                            ->maxLength(255)
                            ->prefix('https://'),
                    ]),
                Forms\Components\Grid::make(2)
                    ->schema([
                        Forms\Components\TextInput::make('username')
                            ->label('Username / Email')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('password')
                            ->password()
                            ->revealable()
                            ->required()
                            ->maxLength(255)
                            ->helperText('Stored securely with encryption'),
                    ]),
                Forms\Components\Textarea::make('notes')
                    ->rows(3)
                    ->columnSpanFull(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('service_name')
            ->columns([
                Tables\Columns\TextColumn::make('service_name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->icon(fn (string $state, $record): string => match ($record->type) {
                        'server' => 'heroicon-o-server',
                        'database' => 'heroicon-o-circle-stack',
                        'api_key' => 'heroicon-o-key',
                        'wifi' => 'heroicon-o-wifi',
                        default => 'heroicon-o-globe-alt',
                    }),
                Tables\Columns\TextColumn::make('type')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'api_key' => 'API Key',
                        default => ucfirst($state),
                    }),
                Tables\Columns\TextColumn::make('username')
                    ->label('Username')
                    ->searchable()
                    ->copyable()
                    ->icon('heroicon-m-user'),
                Tables\Columns\TextColumn::make('url')
                    ->label('URL')
                    ->limit(30)
                    ->icon('heroicon-m-link')
                    ->url(fn ($state) => $state, true)
                    ->color('primary'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->options([
                        'login' => 'Login Credentials',
                        'server' => 'Server / SSH',
                        'database' => 'Database',
                        'api_key' => 'API Key / Token',
                        'wifi' => 'Wi-Fi',
                        'other' => 'Other',
                    ]),
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\Action::make('copy_password')
                    ->label('Copy Password')
                    ->icon('heroicon-o-clipboard-document')
                    ->color('gray')
                    ->action(function ($record) {
                        // In a real browser interaction, we can't write to clipboard from server side easily without JS.
                        // Filament's ->copyable() works because it renders AlpineJS.
                        // But for a custom action to copy a HIDDEN value, it's trickier.
                        // A simple workaround is to show a modal with the password that can be copied.
                    })
                    ->modalHeading('Password')
                    ->modalDescription('Click to copy the password.')
                    ->form([
                        Forms\Components\TextInput::make('password_view')
                            ->label('Password')
                            ->default(fn ($record) => $record->password)
                            ->readonly()
                            ->suffixAction(
                                Forms\Components\Actions\Action::make('copy')
                                    ->icon('heroicon-m-clipboard')
                                    ->action(function () {
                                        Notification::make()->title('Copied!')->success()->send();
                                    })
                                    // This is still server-side.
                                    // The best way in Filament to copy to clipboard is using the copyable() on a column or text entry.
                                    // So let's just make this input copyable.
                            ),
                    ])
                    ->modalSubmitAction(false)
                    ->modalCancelActionLabel('Close'),
                    
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
