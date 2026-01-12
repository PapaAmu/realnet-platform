<?php

namespace App\Filament\Resources\TaskResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use App\Models\Task;

class DependenciesRelationManager extends RelationManager
{
    protected static string $relationship = 'dependencies';

    protected static ?string $title = 'Task Dependencies';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('depends_on_task_id')
                    ->label('Depends On Task')
                    ->options(function () {
                        // Get all tasks from the same project except the current task
                        $currentTaskId = $this->ownerRecord->id;
                        $projectId = $this->ownerRecord->project_id;
                        
                        return Task::where('project_id', $projectId)
                            ->where('id', '!=', $currentTaskId)
                            ->pluck('title', 'id');
                    })
                    ->required()
                    ->searchable()
                    ->helperText('Select the task that must be completed before this task can start'),
                Forms\Components\Select::make('dependency_type')
                    ->label('Dependency Type')
                    ->options([
                        'finish_to_start' => 'Finish to Start (Default)',
                        'start_to_start' => 'Start to Start',
                        'finish_to_finish' => 'Finish to Finish',
                        'start_to_finish' => 'Start to Finish',
                    ])
                    ->required()
                    ->default('finish_to_start')
                    ->native(false)
                    ->helperText('Define how this task depends on the selected task'),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('dependency_type')
            ->columns([
                Tables\Columns\TextColumn::make('dependsOnTask.title')
                    ->label('Depends On')
                    ->weight('bold')
                    ->searchable()
                    ->limit(40),
                Tables\Columns\TextColumn::make('dependsOnTask.status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'todo' => 'gray',
                        'in_progress' => 'warning',
                        'review' => 'info',
                        'completed' => 'success',
                        'cancelled' => 'danger',
                    }),
                Tables\Columns\TextColumn::make('dependency_type')
                    ->label('Type')
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'finish_to_start' => 'Finish → Start',
                        'start_to_start' => 'Start → Start',
                        'finish_to_finish' => 'Finish → Finish',
                        'start_to_finish' => 'Start → Finish',
                    })
                    ->badge()
                    ->color('info'),
                Tables\Columns\TextColumn::make('dependsOnTask.due_date')
                    ->label('Due Date')
                    ->date()
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_blocking')
                    ->label('Blocking')
                    ->getStateUsing(fn ($record) => $record->dependsOnTask->status !== 'completed')
                    ->boolean()
                    ->trueIcon('heroicon-o-lock-closed')
                    ->falseIcon('heroicon-o-lock-open')
                    ->trueColor('danger')
                    ->falseColor('success')
                    ->tooltip(fn ($record) => $record->dependsOnTask->status !== 'completed' 
                        ? 'This dependency is blocking the task' 
                        : 'Dependency completed'),
            ])
            ->filters([
                Tables\Filters\Filter::make('blocking')
                    ->query(fn ($query) => $query->whereHas('dependsOnTask', function ($q) {
                        $q->where('status', '!=', 'completed');
                    }))
                    ->label('Blocking Only'),
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\Action::make('view_task')
                    ->label('View Task')
                    ->icon('heroicon-o-eye')
                    ->url(fn ($record) => route('filament.admin.project-management.resources.tasks.edit', ['record' => $record->depends_on_task_id]))
                    ->openUrlInNewTab(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->emptyStateHeading('No Dependencies')
            ->emptyStateDescription('This task has no dependencies. Add dependencies to define task execution order.')
            ->emptyStateIcon('heroicon-o-link');
    }
}
