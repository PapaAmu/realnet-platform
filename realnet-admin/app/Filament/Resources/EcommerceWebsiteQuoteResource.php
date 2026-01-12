<?php
// app/Filament/Resources/EcommerceWebsiteQuoteResource.php

namespace App\Filament\Resources;

use App\Filament\Resources\EcommerceWebsiteQuoteResource\Pages;
use App\Filament\Resources\EcommerceWebsiteQuoteResource\RelationManagers;
use App\Models\EcommerceWebsiteQuote;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Infolists;
use Filament\Infolists\Infolist;

class EcommerceWebsiteQuoteResource extends Resource
{
    protected static ?string $model = EcommerceWebsiteQuote::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-cart';

    protected static ?string $navigationGroup = 'Quote Requests';

    protected static ?string $navigationLabel = 'Ecommerce Quotes';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Project Details')
                    ->schema([
                        Forms\Components\Select::make('project_type')
                            ->options([
                                'new' => 'New Ecommerce Store',
                                'redesign' => 'Redesign Store',
                                'improve' => 'Add Ecommerce',
                            ])
                            ->required()
                            ->native(false),
                        Forms\Components\TextInput::make('business_name')
                            ->maxLength(255),
                        Forms\Components\Select::make('products_count')
                            ->options([
                                '1-50' => '1-50 products',
                                '51-100' => '51-100 products',
                                '101-200' => '101-200 products',
                                '200+' => '200+ products',
                            ])
                            ->required()
                            ->native(false),
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
                        Forms\Components\DateTimePicker::make('created_at')
                            ->label('Submitted At')
                            ->disabled()
                            ->displayFormat('M j, Y g:i A'),
                        Forms\Components\DateTimePicker::make('updated_at')
                            ->label('Last Updated')
                            ->disabled()
                            ->displayFormat('M j, Y g:i A'),
                    ])
                    ->columns(2),
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
                        'new' => 'New Store',
                        'redesign' => 'Redesign',
                        'improve' => 'Add Ecommerce',
                    })
                    ->color(fn (string $state): string => match ($state) {
                        'new' => 'success',
                        'redesign' => 'warning',
                        'improve' => 'info',
                    }),

                Tables\Columns\TextColumn::make('products_count')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        '1-50' => '1-50',
                        '51-100' => '51-100',
                        '101-200' => '101-200',
                        '200+' => '200+',
                    })
                    ->color(fn (string $state): string => match ($state) {
                        '1-50' => 'gray',
                        '51-100' => 'info',
                        '101-200' => 'warning',
                        '200+' => 'success',
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
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: false),

                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime('M j, Y g:i A')
                    ->label('Last Updated')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('project_type')
                    ->options([
                        'new' => 'New Ecommerce Store',
                        'redesign' => 'Redesign Store',
                        'improve' => 'Add Ecommerce',
                    ])
                    ->label('Project Type'),

                Tables\Filters\SelectFilter::make('products_count')
                    ->options([
                        '1-50' => '1-50 products',
                        '51-100' => '51-100 products',
                        '101-200' => '101-200 products',
                        '200+' => '200+ products',
                    ])
                    ->label('Products Count'),

                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'new' => 'New',
                        'contacted' => 'Contacted',
                        'quoted' => 'Quoted',
                        'accepted' => 'Accepted',
                        'rejected' => 'Rejected',
                    ])
                    ->label('Status'),

                Tables\Filters\Filter::make('created_at')
                    ->form([
                        Forms\Components\DatePicker::make('submitted_from')
                            ->label('Submitted From'),
                        Forms\Components\DatePicker::make('submitted_until')
                            ->label('Submitted Until'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['submitted_from'],
                                fn (Builder $query, $date): Builder => $query->whereDate('created_at', '>=', $date),
                            )
                            ->when(
                                $data['submitted_until'],
                                fn (Builder $query, $date): Builder => $query->whereDate('created_at', '<=', $date),
                            );
                    }),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('contact')
                    ->icon('heroicon-o-chat-bubble-left-right')
                    ->color('success')
                    ->action(function (EcommerceWebsiteQuote $record) {
                        $record->update(['status' => 'contacted']);
                    })
                    ->requiresConfirmation()
                    ->visible(fn (EcommerceWebsiteQuote $record): bool => $record->status === 'new'),

                Tables\Actions\Action::make('quote')
                    ->icon('heroicon-o-document-currency-dollar')
                    ->color('warning')
                    ->action(function (EcommerceWebsiteQuote $record) {
                        $record->update(['status' => 'quoted']);
                    })
                    ->requiresConfirmation()
                    ->visible(fn (EcommerceWebsiteQuote $record): bool => $record->status === 'contacted'),

                Tables\Actions\Action::make('accept')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->action(function (EcommerceWebsiteQuote $record) {
                        $record->update(['status' => 'accepted']);
                    })
                    ->requiresConfirmation()
                    ->visible(fn (EcommerceWebsiteQuote $record): bool => $record->status === 'quoted'),

                Tables\Actions\Action::make('reject')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->action(function (EcommerceWebsiteQuote $record) {
                        $record->update(['status' => 'rejected']);
                    })
                    ->requiresConfirmation()
                    ->visible(fn (EcommerceWebsiteQuote $record): bool => in_array($record->status, ['new', 'contacted', 'quoted'])),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\BulkAction::make('markAsContacted')
                        ->icon('heroicon-o-chat-bubble-left-right')
                        ->action(function ($records) {
                            $records->each->update(['status' => 'contacted']);
                        })
                        ->deselectRecordsAfterCompletion(),
                    Tables\Actions\BulkAction::make('markAsQuoted')
                        ->icon('heroicon-o-document-currency-dollar')
                        ->action(function ($records) {
                            $records->each->update(['status' => 'quoted']);
                        })
                        ->deselectRecordsAfterCompletion(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Infolists\Components\Section::make('Project Details')
                    ->schema([
                        Infolists\Components\TextEntry::make('project_type')
                            ->formatStateUsing(fn (string $state): string => match ($state) {
                                'new' => 'New Ecommerce Store',
                                'redesign' => 'Redesign Store',
                                'improve' => 'Add Ecommerce',
                            })
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                'new' => 'success',
                                'redesign' => 'warning',
                                'improve' => 'info',
                            }),

                        Infolists\Components\TextEntry::make('business_name')
                            ->placeholder('No business name provided'),

                        Infolists\Components\TextEntry::make('products_count')
                            ->formatStateUsing(fn (string $state): string => match ($state) {
                                '1-50' => '1-50 products',
                                '51-100' => '51-100 products',
                                '101-200' => '101-200 products',
                                '200+' => '200+ products',
                            })
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                '1-50' => 'gray',
                                '51-100' => 'info',
                                '101-200' => 'warning',
                                '200+' => 'success',
                            }),

                        Infolists\Components\TextEntry::make('description')
                            ->columnSpanFull()
                            ->prose(),
                    ])
                    ->columns(2),

                Infolists\Components\Section::make('Contact Information')
                    ->schema([
                        Infolists\Components\TextEntry::make('contact_full_name')
                            ->icon('heroicon-o-user'),

                        Infolists\Components\TextEntry::make('contact_email')
                            ->icon('heroicon-o-envelope')
                            ->url(fn ($record) => "mailto:{$record->contact_email}"),

                        Infolists\Components\TextEntry::make('contact_phone')
                            ->icon('heroicon-o-phone')
                            ->url(fn ($record) => "tel:{$record->contact_phone}"),
                    ])
                    ->columns(2),

                Infolists\Components\Section::make('Attachments')
                    ->schema([
                        Infolists\Components\RepeatableEntry::make('attachments')
                            ->schema([
                                Infolists\Components\TextEntry::make('name')
                                    ->label('File Name'),
                                Infolists\Components\TextEntry::make('size')
                                    ->label('File Size')
                                    ->formatStateUsing(fn ($state) => number_format($state / 1024 / 1024, 2) . ' MB'),
                                Infolists\Components\TextEntry::make('mime_type')
                                    ->label('File Type'),
                            ])
                            ->columns(3)
                            ->visible(fn ($record) => !empty($record->attachments)),
                    ])
                    ->visible(fn ($record) => !empty($record->attachments)),

                Infolists\Components\Section::make('Status & Timeline')
                    ->schema([
                        Infolists\Components\TextEntry::make('status')
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

                        Infolists\Components\TextEntry::make('created_at')
                            ->label('Submitted At')
                            ->dateTime('M j, Y g:i A'),

                        Infolists\Components\TextEntry::make('updated_at')
                            ->label('Last Updated')
                            ->dateTime('M j, Y g:i A'),
                    ])
                    ->columns(3),
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
            'index' => Pages\ListEcommerceWebsiteQuotes::route('/'),
            'create' => Pages\CreateEcommerceWebsiteQuote::route('/create'),
            'view' => Pages\ViewEcommerceWebsiteQuote::route('/{record}'),
            'edit' => Pages\EditEcommerceWebsiteQuote::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['business_name', 'contact_full_name', 'contact_email', 'contact_phone', 'description'];
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