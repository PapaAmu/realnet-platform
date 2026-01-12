<?php

namespace App\Filament\Resources\TaskResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Notifications\Notification;

class TimeLogsRelationManager extends RelationManager
{
    protected static string $relationship = 'timeLogs';

    protected static ?string $title = 'Time Tracking';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\DateTimePicker::make('started_at')
                    ->label('Start Time')
                    ->required()
                    ->native(false)
                    ->default(now()),
                Forms\Components\DateTimePicker::make('ended_at')
                    ->label('End Time')
                    ->native(false)
                    ->after('started_at')
                    ->helperText('Leave empty for ongoing timer'),
                Forms\Components\TextInput::make('duration_minutes')
                    ->label('Duration (minutes)')
                    ->numeric()
                    ->disabled()
                    ->dehydrated(false)
                    ->helperText('Calculated automatically'),
                Forms\Components\Textarea::make('description')
                    ->label('What did you work on?')
                    ->rows(3)
                    ->columnSpanFull(),
                Forms\Components\Toggle::make('billable')
                    ->label('Billable Time')
                    ->default(true)
                    ->helperText('Mark this time as billable to the client'),
                Forms\Components\Hidden::make('user_id')
                    ->default(auth()->id()),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('description')
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->label('User')
                    ->weight('bold')
                    ->icon('heroicon-o-user')
                    ->sortable(),
                Tables\Columns\TextColumn::make('started_at')
                    ->label('Started')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('ended_at')
                    ->label('Ended')
                    ->dateTime()
                    ->placeholder('Running...')
                    ->color(fn ($record) => $record->isRunning() ? 'success' : null),
                Tables\Columns\TextColumn::make('duration_minutes')
                    ->label('Duration')
                    ->formatStateUsing(function ($state, $record) {
                        if ($record->isRunning()) {
                            $minutes = $record->started_at->diffInMinutes(now());
                        } else {
                            $minutes = $state ?? 0;
                        }
                        
                        $hours = floor($minutes / 60);
                        $mins = $minutes % 60;
                        
                        return "{$hours}h {$mins}m";
                    })
                    ->badge()
                    ->color(fn ($record) => $record->isRunning() ? 'success' : 'gray')
                    ->sortable(),
                Tables\Columns\IconColumn::make('billable')
                    ->boolean()
                    ->trueIcon('heroicon-o-currency-dollar')
                    ->falseIcon('heroicon-o-x-circle')
                    ->trueColor('success')
                    ->falseColor('gray')
                    ->tooltip(fn ($record) => $record->billable ? 'Billable' : 'Non-billable'),
                Tables\Columns\TextColumn::make('description')
                    ->limit(50)
                    ->searchable()
                    ->toggleable(),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('billable')
                    ->label('Billable')
                    ->placeholder('All time logs')
                    ->trueLabel('Billable only')
                    ->falseLabel('Non-billable only'),
                Tables\Filters\Filter::make('running')
                    ->query(fn ($query) => $query->whereNull('ended_at'))
                    ->label('Running Timers Only'),
            ])
            ->headerActions([
                Tables\Actions\Action::make('start_timer')
                    ->label('Start Timer')
                    ->icon('heroicon-o-play')
                    ->color('success')
                    ->action(function () {
                        $this->ownerRecord->startTimer();
                        
                        Notification::make()
                            ->title('Timer Started')
                            ->success()
                            ->send();
                    })
                    ->visible(fn () => !$this->ownerRecord->active_time_log),
                Tables\Actions\Action::make('stop_timer')
                    ->label('Stop Timer')
                    ->icon('heroicon-o-stop')
                    ->color('danger')
                    ->action(function () {
                        $this->ownerRecord->stopTimer();
                        
                        Notification::make()
                            ->title('Timer Stopped')
                            ->success()
                            ->send();
                    })
                    ->visible(fn () => $this->ownerRecord->active_time_log != null),
                Tables\Actions\CreateAction::make()
                    ->label('Add Manual Entry')
                    ->mutateFormDataUsing(function (array $data): array {
                        $data['user_id'] = auth()->id();
                        
                        // Calculate duration if both times are set
                        if (isset($data['started_at']) && isset($data['ended_at'])) {
                            $start = \Carbon\Carbon::parse($data['started_at']);
                            $end = \Carbon\Carbon::parse($data['ended_at']);
                            $data['duration_minutes'] = $start->diffInMinutes($end);
                        }
                        
                        return $data;
                    })
                    ->after(function () {
                        $this->ownerRecord->updateActualHours();
                    }),
            ])
            ->actions([
                Tables\Actions\Action::make('stop')
                    ->icon('heroicon-o-stop')
                    ->color('danger')
                    ->action(function ($record) {
                        $record->stopTimer();
                        $this->ownerRecord->updateActualHours();
                        
                        Notification::make()
                            ->title('Timer Stopped')
                            ->success()
                            ->send();
                    })
                    ->visible(fn ($record) => $record->isRunning())
                    ->requiresConfirmation(),
                Tables\Actions\EditAction::make()
                    ->after(function () {
                        $this->ownerRecord->updateActualHours();
                    }),
                Tables\Actions\DeleteAction::make()
                    ->after(function () {
                        $this->ownerRecord->updateActualHours();
                    }),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()
                        ->after(function () {
                            $this->ownerRecord->updateActualHours();
                        }),
                ]),
            ])
            ->defaultSort('started_at', 'desc')
            ->poll('10s');
    }
}
