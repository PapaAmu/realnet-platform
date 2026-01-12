<?php
// app/Filament/Resources/StarterWebsiteQuoteResource.php

namespace App\Filament\Resources;

use App\Filament\Resources\StarterWebsiteQuoteResource\Pages;
use App\Models\StarterWebsiteQuote;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Infolists;
use Filament\Infolists\Infolist;

class StarterWebsiteQuoteResource extends Resource
{
    protected static ?string $model = StarterWebsiteQuote::class;

    protected static ?string $navigationIcon = 'heroicon-o-globe-alt';

    protected static ?string $navigationGroup = 'Quote Requests';

    protected static ?string $navigationLabel = 'Starter Website Quotes';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Project Details')
                    ->schema([
                        Forms\Components\Select::make('project_type')
                            ->options([
                                'new' => 'New Website',
                                'redesign' => 'Redesign Website',
                                'fix' => 'Fix/Improve Website',
                            ])
                            ->required()
                            ->native(false),
                        Forms\Components\TextInput::make('business_name')
                            ->maxLength(255),
                        Forms\Components\Textarea::make('description')
                            ->required()
                            ->rows(5)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Contact Information')
                    ->schema([
                        Forms\Components\TextInput::make('contact_full_name')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('contact_email')
                            ->email()
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('contact_phone')
                            ->required()
                            ->maxLength(20),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Status & Management')
                    ->schema([
                        Forms\Components\Select::make('status')
                            ->options([
                                'new' => 'New',
                                'contacted' => 'Contacted',
                                'quoted' => 'Quoted',
                                'accepted' => 'Accepted',
                                'rejected' => 'Rejected',
                            ])
                            ->required()
                            ->default('new')
                            ->native(false),
                    ])
                    ->columns(1),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label('ID')
                    ->sortable()
                    ->searchable(),

                Tables\Columns\TextColumn::make('business_name')
                    ->searchable()
                    ->placeholder('No business name')
                    ->sortable(),

                Tables\Columns\TextColumn::make('contact_full_name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('contact_email')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('project_type')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'new' => 'New Website',
                        'redesign' => 'Redesign',
                        'fix' => 'Fix/Improve',
                    })
                    ->color(fn (string $state): string => match ($state) {
                        'new' => 'success',
                        'redesign' => 'warning',
                        'fix' => 'info',
                    }),

                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'new' => 'New',
                        'contacted' => 'Contacted',
                        'quoted' => 'Quoted',
                        'accepted' => 'Accepted',
                        'rejected' => 'Rejected',
                    })
                    ->color(fn (string $state): string => match ($state) {
                        'new' => 'primary',
                        'contacted' => 'info',
                        'quoted' => 'warning',
                        'accepted' => 'success',
                        'rejected' => 'danger',
                    }),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('M j, Y g:i A')
                    ->label('Submitted')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('project_type')
                    ->options([
                        'new' => 'New Website',
                        'redesign' => 'Redesign Website',
                        'fix' => 'Fix/Improve Website',
                    ]),

                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'new' => 'New',
                        'contacted' => 'Contacted',
                        'quoted' => 'Quoted',
                        'accepted' => 'Accepted',
                        'rejected' => 'Rejected',
                    ]),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListStarterWebsiteQuotes::route('/'),
            'create' => Pages\CreateStarterWebsiteQuote::route('/create'),
            'view' => Pages\ViewStarterWebsiteQuote::route('/{record}'),
            'edit' => Pages\EditStarterWebsiteQuote::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::where('status', 'new')->count() ?: null;
    }

    public static function getNavigationBadgeColor(): string|array|null
    {
        return static::getModel()::where('status', 'new')->count() > 0 ? 'primary' : 'gray';
    }
}