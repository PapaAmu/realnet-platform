<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TaskResource\Pages;
use App\Filament\Resources\TaskResource\RelationManagers;
use App\Models\Task;
use App\Models\Project;
use App\Models\User;
use App\Models\TaskLabel;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Grid;
use Filament\Support\Colors\Color;

class TaskResource extends Resource
{
    protected static ?string $model = Task::class;

    protected static ?string $navigationIcon = 'heroicon-o-check-circle';

    protected static ?string $cluster = \App\Filament\Clusters\ProjectManagement::class;

    protected static ?string $recordTitleAttribute = 'title';

    public static function getGloballySearchableAttributes(): array
    {
        return ['title', 'description'];
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Task Information')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->columnSpan(2),
                        Forms\Components\Textarea::make('description')
                            ->maxLength(65535)
                            ->rows(4)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
                
                Section::make('Assignment & Status')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Forms\Components\Select::make('project_id')
                                    ->label('Project')
                                    ->relationship('project', 'name')
                                    ->searchable()
                                    ->preload()
                                    ->live(),
                                Forms\Components\Select::make('hosting_account_id')
                                    ->label('Hosting Service')
                                    ->relationship('hostingAccount', 'domain_name')
                                    ->searchable()
                                    ->preload()
                                    ->helperText('Select for maintenance tasks'),
                                Forms\Components\Select::make('assigned_to')
                                    ->label('Assigned To')
                                    ->relationship('assignedTo', 'name')
                                    ->searchable()
                                    ->preload(),
                                Forms\Components\Select::make('parent_task_id')
                                    ->label('Parent Task')
                                    ->relationship('parentTask', 'title')
                                    ->searchable()
                                    ->preload()
                                    ->helperText('Make this a subtask of another task'),
                            ]),
                        Grid::make(3)
                            ->schema([
                                Forms\Components\Select::make('status')
                                    ->options([
                                        'todo' => 'To Do',
                                        'in_progress' => 'In Progress',
                                        'review' => 'Review',
                                        'completed' => 'Completed',
                                        'cancelled' => 'Cancelled',
                                    ])
                                    ->required()
                                    ->native(false)
                                    ->default('todo'),
                                Forms\Components\Select::make('priority')
                                    ->options([
                                        'low' => 'Low',
                                        'medium' => 'Medium',
                                        'high' => 'High',
                                        'urgent' => 'Urgent',
                                    ])
                                    ->required()
                                    ->native(false)
                                    ->default('medium'),
                                Forms\Components\Toggle::make('is_milestone')
                                    ->label('Milestone Task')
                                    ->default(false)
                                    ->helperText('Mark important project milestones'),
                            ]),
                    ]),
                
                Section::make('Timeline & Tracking')
                    ->schema([
                        Grid::make(4)
                            ->schema([
                                Forms\Components\DatePicker::make('due_date')
                                    ->label('Due Date')
                                    ->native(false),
                                Forms\Components\DatePicker::make('started_at')
                                    ->label('Started Date')
                                    ->native(false),
                                Forms\Components\DatePicker::make('completed_at')
                                    ->label('Completed Date')
                                    ->native(false)
                                    ->disabled(fn ($get) => $get('status') !== 'completed'),
                                Forms\Components\TextInput::make('progress')
                                    ->label('Progress (%)')
                                    ->numeric()
                                    ->minValue(0)
                                    ->maxValue(100)
                                    ->suffix('%')
                                    ->default(0),
                            ]),
                        Grid::make(2)
                            ->schema([
                                Forms\Components\TextInput::make('estimated_hours')
                                    ->label('Estimated Hours')
                                    ->numeric()
                                    ->suffix('hours')
                                    ->minValue(0)
                                    ->step(0.5),
                                Forms\Components\TextInput::make('actual_hours')
                                    ->label('Actual Hours')
                                    ->numeric()
                                    ->suffix('hours')
                                    ->disabled()
                                    ->dehydrated(false)
                                    ->helperText('Calculated automatically from time logs'),
                            ]),
                    ])
                    ->collapsible(),
                
                Section::make('Labels & Categories')
                    ->schema([
                        Forms\Components\Select::make('labels')
                            ->multiple()
                            ->relationship('labels', 'name')
                            ->searchable()
                            ->preload()
                            ->createOptionForm([
                                Forms\Components\TextInput::make('name')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\ColorPicker::make('color')
                                    ->default('#3B82F6'),
                                Forms\Components\Textarea::make('description')
                                    ->rows(2),
                            ])
                            ->helperText('Tag this task with labels for easy filtering'),
                    ])
                    ->collapsible()
                    ->collapsed(),
                
                Section::make('Additional Settings')
                    ->schema([
                        Forms\Components\KeyValue::make('custom_fields')
                            ->label('Custom Fields')
                            ->keyLabel('Field Name')
                            ->valueLabel('Field Value')
                            ->reorderable(),
                    ])
                    ->collapsible()
                    ->collapsed(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\IconColumn::make('is_milestone')
                    ->label('')
                    ->boolean()
                    ->trueIcon('heroicon-o-star')
                    ->falseIcon('')
                    ->trueColor('warning')
                    ->tooltip('Milestone'),
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->limit(40)
                    ->tooltip(fn ($record) => $record->title),
                Tables\Columns\TextColumn::make('project.name')
                    ->sortable()
                    ->badge()
                    ->color('info')
                    ->searchable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('hostingAccount.domain_name')
                    ->label('Hosting')
                    ->sortable()
                    ->badge()
                    ->color('success')
                    ->searchable()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'todo' => 'gray',
                        'in_progress' => 'warning',
                        'review' => 'info',
                        'completed' => 'success',
                        'cancelled' => 'danger',
                    }),
                Tables\Columns\TextColumn::make('priority')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'low' => 'gray',
                        'medium' => 'info',
                        'high' => 'warning',
                        'urgent' => 'danger',
                    }),
                Tables\Columns\TextColumn::make('progress')
                    ->label('Progress')
                    ->suffix('%')
                    ->badge()
                    ->color(fn ($state): string => match (true) {
                        $state >= 80 => 'success',
                        $state >= 50 => 'warning',
                        default => 'danger',
                    })
                    ->sortable(),
                Tables\Columns\TextColumn::make('assignedTo.name')
                    ->label('Assigned To')
                    ->sortable()
                    ->placeholder('Unassigned')
                    ->icon('heroicon-o-user'),
                Tables\Columns\TextColumn::make('due_date')
                    ->date()
                    ->sortable()
                    ->color(fn ($record) => $record->isOverdue() ? 'danger' : null)
                    ->icon(fn ($record) => $record->isOverdue() ? 'heroicon-o-exclamation-triangle' : null),
                Tables\Columns\TextColumn::make('estimated_hours')
                    ->label('Est.')
                    ->suffix('h')
                    ->toggleable(),
                Tables\Columns\TextColumn::make('actual_hours')
                    ->label('Actual')
                    ->suffix('h')
                    ->toggleable()
                    ->placeholder('0h'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('project')
                    ->relationship('project', 'name')
                    ->searchable()
                    ->preload()
                    ->multiple(),
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'todo' => 'To Do',
                        'in_progress' => 'In Progress',
                        'review' => 'Review',
                        'completed' => 'Completed',
                        'cancelled' => 'Cancelled',
                    ])
                    ->multiple(),
                Tables\Filters\SelectFilter::make('priority')
                    ->options([
                        'low' => 'Low',
                        'medium' => 'Medium',
                        'high' => 'High',
                        'urgent' => 'Urgent',
                    ])
                    ->multiple(),
                Tables\Filters\SelectFilter::make('assigned_to')
                    ->label('Assigned To')
                    ->relationship('assignedTo', 'name')
                    ->searchable()
                    ->preload()
                    ->multiple(),
                Tables\Filters\SelectFilter::make('labels')
                    ->relationship('labels', 'name')
                    ->searchable()
                    ->preload()
                    ->multiple(),
                Tables\Filters\Filter::make('overdue')
                    ->query(fn (Builder $query): Builder => $query->where('due_date', '<', now())->where('status', '!=', 'completed'))
                    ->label('Overdue'),
                Tables\Filters\Filter::make('my_tasks')
                    ->query(fn (Builder $query): Builder => $query->where('assigned_to', auth()->id()))
                    ->label('My Tasks'),
                Tables\Filters\Filter::make('milestones')
                    ->query(fn (Builder $query): Builder => $query->where('is_milestone', true))
                    ->label('Milestones Only'),
            ])
            ->actions([
                Tables\Actions\Action::make('start_timer')
                    ->icon('heroicon-o-play')
                    ->color('success')
                    ->action(fn (Task $record) => $record->startTimer())
                    ->visible(fn (Task $record) => !$record->active_time_log && $record->status !== 'completed')
                    ->requiresConfirmation()
                    ->modalHeading('Start Time Tracking')
                    ->modalDescription('This will start tracking time for this task.'),
                Tables\Actions\Action::make('stop_timer')
                    ->icon('heroicon-o-stop')
                    ->color('danger')
                    ->action(fn (Task $record) => $record->stopTimer())
                    ->visible(fn (Task $record) => $record->active_time_log != null)
                    ->requiresConfirmation()
                    ->modalHeading('Stop Time Tracking')
                    ->modalDescription('This will stop the active timer.'),
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\BulkAction::make('mark_completed')
                        ->label('Mark as Completed')
                        ->icon('heroicon-o-check-circle')
                        ->color('success')
                        ->action(fn ($records) => $records->each->update(['status' => 'completed', 'completed_at' => now()]))
                        ->deselectRecordsAfterCompletion()
                        ->requiresConfirmation(),
                    Tables\Actions\BulkAction::make('assign_to')
                        ->label('Assign To')
                        ->icon('heroicon-o-user')
                        ->form([
                            Forms\Components\Select::make('user_id')
                                ->label('Assign to User')
                                ->options(User::all()->pluck('name', 'id'))
                                ->required()
                                ->searchable(),
                        ])
                        ->action(fn ($records, array $data) => $records->each->update(['assigned_to' => $data['user_id']]))
                        ->deselectRecordsAfterCompletion(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [
            RelationManagers\SubtasksRelationManager::class,
            RelationManagers\TimeLogsRelationManager::class,
            RelationManagers\CommentsRelationManager::class,
            RelationManagers\AttachmentsRelationManager::class,
            RelationManagers\DependenciesRelationManager::class,
            RelationManagers\ActivityLogsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTasks::route('/'),
            'create' => Pages\CreateTask::route('/create'),
            'edit' => Pages\EditTask::route('/{record}/edit'),
            // 'view' => Pages\ViewTask::route('/{record}'),
        ];
    }
}