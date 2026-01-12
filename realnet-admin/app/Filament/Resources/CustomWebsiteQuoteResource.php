<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CustomWebsiteQuoteResource\Pages;
use App\Models\CustomWebsiteQuote;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Filament\Infolists;
use Filament\Infolists\Infolist;

class CustomWebsiteQuoteResource extends Resource
{
    protected static ?string $model = CustomWebsiteQuote::class;

    protected static ?string $navigationIcon = 'heroicon-o-computer-desktop';

    protected static ?string $navigationGroup = 'Quote Requests';

    protected static ?string $navigationLabel = 'Custom Website Quotes';

    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Project Details')
                    ->schema([
                        Forms\Components\TextInput::make('project_type')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('business_name')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('industry')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('timeline')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('budget_range')
                            ->maxLength(255),
                        Forms\Components\Textarea::make('technical_requirements')
                            ->rows(3),
                        Forms\Components\Textarea::make('description')
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
                        Forms\Components\TextInput::make('contact_company_role')
                            ->maxLength(255),
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
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('M j, Y')
                    ->sortable()
                    ->label('Date'),
                Tables\Columns\TextColumn::make('project_type')
                    ->searchable()
                    ->badge(),
                Tables\Columns\TextColumn::make('business_name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('contact_full_name')
                    ->searchable()
                    ->label('Contact'),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'new' => 'primary',
                        'contacted' => 'info',
                        'quoted' => 'warning',
                        'accepted' => 'success',
                        'rejected' => 'danger',
                        default => 'gray',
                    }),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
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
            ]);
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Infolists\Components\Section::make('Project Information')
                    ->schema([
                        Infolists\Components\TextEntry::make('project_type'),
                        Infolists\Components\TextEntry::make('business_name'),
                        Infolists\Components\TextEntry::make('industry'),
                        Infolists\Components\TextEntry::make('timeline'),
                        Infolists\Components\TextEntry::make('budget_range'),
                        Infolists\Components\TextEntry::make('features')
                            ->listWithLineBreaks()
                            ->bulleted(),
                    ])->columns(3),
                Infolists\Components\Section::make('Description')
                    ->schema([
                        Infolists\Components\TextEntry::make('description'),
                        Infolists\Components\TextEntry::make('technical_requirements'),
                    ]),
                Infolists\Components\Section::make('Contact Details')
                    ->schema([
                        Infolists\Components\TextEntry::make('contact_full_name'),
                        Infolists\Components\TextEntry::make('contact_email'),
                        Infolists\Components\TextEntry::make('contact_phone'),
                        Infolists\Components\TextEntry::make('contact_company_role'),
                    ])->columns(3),
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
            'index' => Pages\ListCustomWebsiteQuotes::route('/'),
            'create' => Pages\CreateCustomWebsiteQuote::route('/create'),
            'view' => Pages\ViewCustomWebsiteQuote::route('/{record}'),
            'edit' => Pages\EditCustomWebsiteQuote::route('/{record}/edit'),
        ];
    }
}
