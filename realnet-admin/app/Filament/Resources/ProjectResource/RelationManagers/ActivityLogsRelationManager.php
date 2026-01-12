<?php

namespace App\Filament\Resources\ProjectResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class ActivityLogsRelationManager extends RelationManager
{
    protected static string $relationship = 'activityLogs';

    protected static ?string $title = 'Activity Timeline';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                // Activity logs are read-only
                Forms\Components\Placeholder::make('Activity logs are automatically generated and cannot be manually edited.'),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('action')
            ->columns([
                Tables\Columns\IconColumn::make('action')
                    ->label('')
                    ->icon(fn (string $state): string => match ($state) {
                        'created' => 'heroicon-o-plus-circle',
                        'updated' => 'heroicon-o-pencil',
                        'deleted' => 'heroicon-o-trash',
                        'status_changed' => 'heroicon-o-arrow-path',
                        'assigned' => 'heroicon-o-user',
                        default => 'heroicon-o-information-circle',
                    })
                    ->color(fn (string $state): string => match ($state) {
                        'created' => 'success',
                        'updated' => 'info',
                        'deleted' => 'danger',
                        'status_changed' => 'warning',
                        'assigned' => 'primary',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('user.name')
                    ->label('User')
                    ->weight('bold')
                    ->sortable(),
                Tables\Columns\TextColumn::make('description')
                    ->label('Activity')
                    ->limit(100)
                    ->tooltip(fn ($record) => $record->description)
                    ->searchable(),
                Tables\Columns\TextColumn::make('action')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => ucwords(str_replace('_', ' ', $state)))
                    ->color(fn (string $state): string => match ($state) {
                        'created' => 'success',
                        'updated' => 'info',
                        'deleted' => 'danger',
                        'status_changed' => 'warning',
                        'assigned' => 'primary',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('When')
                    ->dateTime()
                    ->sortable()
                    ->since()
                    ->tooltip(fn ($record) => $record->created_at->format('F j, Y g:i A')),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('action')
                    ->options([
                        'created' => 'Created',
                        'updated' => 'Updated',
                        'deleted' => 'Deleted',
                        'status_changed' => 'Status Changed',
                        'assigned' => 'Assigned',
                    ])
                    ->multiple(),
                Tables\Filters\SelectFilter::make('user')
                    ->relationship('user', 'name')
                    ->searchable()
                    ->preload(),
            ])
            ->headerActions([
                // No create action - logs are auto-generated
            ])
            ->actions([
                Tables\Actions\ViewAction::make()
                    ->modalHeading('Activity Details')
                    ->form([
                        Forms\Components\Placeholder::make('user')
                            ->content(fn ($record): string => $record->user->name ?? 'System'),
                        Forms\Components\Placeholder::make('action')
                            ->content(fn ($record): string => ucwords(str_replace('_', ' ', $record->action))),
                        Forms\Components\Placeholder::make('description')
                            ->content(fn ($record): string => $record->description ?? '—'),
                        Forms\Components\Placeholder::make('created_at')
                            ->content(fn ($record): string => $record->created_at->format('F j, Y g:i:s A')),
                        Forms\Components\KeyValue::make('properties')
                            ->label('Changes')
                            ->hidden(fn ($record) => empty($record->properties)),
                    ]),
            ])
            ->bulkActions([
                // No bulk actions for activity logs
            ])
            ->defaultSort('created_at', 'desc')
            ->poll('10s'); // Auto-refresh every 10 seconds
    }

    public function isReadOnly(): bool
    {
        return true;
    }
}
