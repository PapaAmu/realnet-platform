<?php

namespace App\Filament\Resources\ProjectResource\Pages;

use App\Filament\Resources\ProjectResource;
use App\Models\Project;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;
use Filament\Infolists;
use Filament\Infolists\Infolist;

class ViewProject extends ViewRecord
{
    protected static string $resource = ProjectResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }

    public function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Infolists\Components\Section::make('Project Information')
                    ->schema([
                        Infolists\Components\TextEntry::make('name'),
                        Infolists\Components\TextEntry::make('description')
                            ->columnSpanFull(),
                        Infolists\Components\Grid::make(2)
                            ->schema([
                                Infolists\Components\TextEntry::make('status')
                                    ->badge()
                                    ->color(fn (string $state): string => match ($state) {
                                        'planning' => 'gray',
                                        'active' => 'success',
                                        'on_hold' => 'warning',
                                        'completed' => 'primary',
                                        'cancelled' => 'danger',
                                    }),
                                Infolists\Components\TextEntry::make('priority')
                                    ->badge()
                                    ->color(fn (string $state): string => match ($state) {
                                        'low' => 'gray',
                                        'medium' => 'info',
                                        'high' => 'warning',
                                        'urgent' => 'danger',
                                    }),
                            ]),
                        Infolists\Components\Grid::make(2)
                            ->schema([
                                Infolists\Components\TextEntry::make('start_date')
                                    ->date(),
                                Infolists\Components\TextEntry::make('deadline')
                                    ->date()
                                    ->color(fn ($record) => $record->deadline && $record->deadline->isPast() && $record->status !== 'completed' ? 'danger' : null),
                            ]),
                        Infolists\Components\TextEntry::make('budget')
                            ->money('USD'),
                        Infolists\Components\TextEntry::make('progress')
                            ->formatStateUsing(fn ($state): string => $state . '%')
                            ->color(fn ($state): string => match (true) {
                                $state >= 80 => 'success',
                                $state >= 50 => 'warning',
                                default => 'danger',
                            }),
                        Infolists\Components\TextEntry::make('owner.name')
                            ->label('Project Owner'),
                    ]),
                Infolists\Components\Section::make('Team Members')
                    ->schema([
                        Infolists\Components\RepeatableEntry::make('members')
                            ->schema([
                                Infolists\Components\TextEntry::make('name'),
                            ])
                            ->columns(2),
                    ]),
            ]);
    }
}