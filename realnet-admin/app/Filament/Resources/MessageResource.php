<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MessageResource\Pages;
use App\Models\Message;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Filament\Infolists;
use Filament\Infolists\Infolist;
use Filament\Support\Enums\FontWeight;
use Illuminate\Support\Facades\Schema;

class MessageResource extends Resource
{
    protected static ?string $model = Message::class;
    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-right';
    protected static ?string $navigationGroup = 'Communications';
    protected static ?int $navigationSort = 1;

    public static function getNavigationBadge(): ?string
    {
        return self::columnExists('is_read') 
            ? static::getModel()::where('is_read', false)->count()
            : static::getModel()::count();
    }

    public static function getNavigationBadgeColor(): string|array|null
    {
        return self::columnExists('is_read') 
            ? (static::getModel()::where('is_read', false)->count() > 0 ? 'danger' : 'gray')
            : 'gray';
    }

    public static function form(Form $form): Form
    {
        $schema = [
            Forms\Components\Section::make('Message Details')
                ->description('View and manage message information')
                ->icon('heroicon-o-envelope')
                ->schema([
                    Forms\Components\TextInput::make('name')
                        ->label('Sender Name')
                        ->required()
                        ->maxLength(255)
                        ->columnSpan(1)
                        ->disabled(),

                    Forms\Components\TextInput::make('email')
                        ->label('Email Address')
                        ->email()
                        ->required()
                        ->maxLength(255)
                        ->columnSpan(1)
                        ->disabled(),

                    Forms\Components\TextInput::make('subject')
                        ->label('Message Subject')
                        ->required()
                        ->maxLength(255)
                        ->columnSpan(2)
                        ->disabled(),

                    Forms\Components\Textarea::make('message')
                        ->label('Message Content')
                        ->required()
                        ->rows(8)
                        ->columnSpan(2)
                        ->disabled(),
                ])
                ->columns(2),
        ];

        // Add is_read toggle if column exists
        if (self::columnExists('is_read')) {
            $schema[] = Forms\Components\Section::make('Status')
                ->icon('heroicon-o-eye')
                ->schema([
                    Forms\Components\Toggle::make('is_read')
                        ->label('Mark as read')
                        ->onColor('success')
                        ->offColor('gray')
                        ->inline(false),
                ])
                ->collapsible();
        }

        return $form->schema($schema);
    }

    public static function table(Table $table): Table
    {
        $columns = [];

        if (self::columnExists('is_read')) {
            $columns[] = Tables\Columns\IconColumn::make('is_read')
                ->label('Read')
                ->boolean()
                ->trueIcon('heroicon-o-eye')
                ->falseIcon('heroicon-o-eye-slash')
                ->trueColor('success')
                ->falseColor('danger')
                ->sortable();
        }

        $columns = array_merge($columns, [
            Tables\Columns\TextColumn::make('name')
                ->label('Sender')
                ->searchable()
                ->sortable()
                ->weight(FontWeight::Bold)
                ->description(fn (Message $record): string => $record->email)
                ->icon('heroicon-o-user-circle')
                ->iconColor('primary'),

            Tables\Columns\TextColumn::make('subject')
                ->label('Subject')
                ->searchable()
                ->sortable()
                ->limit(50)
                ->tooltip(fn (Message $record): string => $record->subject)
                ->wrap(),

            Tables\Columns\TextColumn::make('message')
                ->label('Preview')
                ->searchable()
                ->limit(30)
                ->tooltip(fn (Message $record): string => $record->message)
                ->wrap(),

            Tables\Columns\TextColumn::make('created_at')
                ->label('Received')
                ->dateTime('M j, Y g:i A')
                ->sortable()
                ->color('gray')
                ->description(fn (Message $record): string => $record->created_at->diffForHumans())
                ->icon('heroicon-o-clock')
                ->iconColor('gray'),
        ]);

        return $table
            ->defaultSort('created_at', 'desc')
            ->columns($columns)
            ->filters([
                Tables\Filters\Filter::make('recent')
                    ->label('Recent (Last 7 days)')
                    ->query(fn (Builder $query): Builder => $query->where('created_at', '>=', now()->subDays(7)))
                    ->toggle(),

                Tables\Filters\SelectFilter::make('email')
                    ->label('Filter by Email')
                    ->options(fn (): array => Message::query()->pluck('email', 'email')->unique()->toArray())
                    ->searchable(),
            ])
            ->actions([
                Tables\Actions\Action::make('view')
                    ->label('')
                    ->icon('heroicon-o-eye')
                    ->color('primary')
                    ->modalHeading(fn (Message $record): string => $record->subject)
                    ->modalDescription(fn (Message $record): string => 'From: ' . $record->name . ' (' . $record->email . ')')
                    ->modalContent(fn (Message $record) => view('filament.modals.message-content', ['message' => $record->message]))
                    ->modalSubmitAction(false)
                    ->modalCancelActionLabel('Close')
                    ->after(function (Message $record) {
                        if (self::columnExists('is_read') && !$record->is_read) {
                            $record->update(['is_read' => true]);
                        }
                    }),

                Tables\Actions\Action::make('reply')
                    ->label('')
                    ->icon('heroicon-o-arrow-uturn-left')
                    ->color('success')
                    ->url(fn (Message $record): string => 'mailto:' . $record->email . '?subject=Re: ' . $record->subject)
                    ->openUrlInNewTab(),

                Tables\Actions\DeleteAction::make()
                    ->label('')
                    ->icon('heroicon-o-trash')
                    ->color('danger'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()
                        ->icon('heroicon-o-trash')
                        ->label('Delete Selected')
                        ->requiresConfirmation(),
                ]),
            ])
            ->emptyStateHeading('No messages yet')
            ->emptyStateDescription('Once you receive messages, they will appear here.')
            ->emptyStateIcon('heroicon-o-chat-bubble-left-ellipsis')
            ->emptyStateActions([
                Tables\Actions\Action::make('visitWebsite')
                    ->label('Go to website')
                    ->url('/')
                    ->icon('heroicon-o-globe-alt')
                    ->button(),
            ])
            ->deferLoading()
            ->persistFiltersInSession()
            ->striped();
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Infolists\Components\Section::make('Message Information')
                    ->icon('heroicon-o-document-text')
                    ->schema([
                        Infolists\Components\TextEntry::make('name')
                            ->label('Sender Name')
                            ->icon('heroicon-o-user')
                            ->weight(FontWeight::Bold)
                            ->size(Infolists\Components\TextEntry\TextEntrySize::Large),

                        Infolists\Components\TextEntry::make('email')
                            ->label('Email Address')
                            ->icon('heroicon-o-envelope')
                            ->color('primary')
                            ->copyable()
                            ->copyMessage('Email address copied')
                            ->copyMessageDuration(1500),

                        Infolists\Components\TextEntry::make('subject')
                            ->label('Subject')
                            ->icon('heroicon-o-chat-bubble-left')
                            ->weight(FontWeight::SemiBold)
                            ->size(Infolists\Components\TextEntry\TextEntrySize::Large),

                        Infolists\Components\TextEntry::make('created_at')
                            ->label('Received')
                            ->icon('heroicon-o-calendar')
                            ->dateTime('F j, Y, g:i a')
                            ->color('gray'),

                        Infolists\Components\TextEntry::make('message')
                            ->label('Message Content')
                            ->markdown()
                            ->prose()
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMessages::route('/'),
            'view' => Pages\ViewMessage::route('/{record}'),
            // Removed edit page since messages shouldn't be editable
        ];
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['name', 'email', 'subject', 'message'];
    }

    public static function getGlobalSearchResultDetails(Model $record): array
    {
        return [
            'From' => $record->name,
            'Email' => $record->email,
            'Date' => $record->created_at->format('M j, Y'),
        ];
    }

    public static function canCreate(): bool
{
    return false;
}

    private static function columnExists(string $column): bool
    {
        return Schema::hasColumn((new Message())->getTable(), $column);
    }
}