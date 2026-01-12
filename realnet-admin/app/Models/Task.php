<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Task extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'project_id',
        'hosting_account_id',
        'parent_task_id',
        'assigned_to',
        'created_by',
        'status',
        'priority',
        'due_date',
        'started_at',
        'completed_at',
        'estimated_hours',
        'actual_hours',
        'progress',
        'order',
        'is_milestone',
        'custom_fields',
    ];


    protected $casts = [
        'due_date' => 'date',
        'started_at' => 'date',
        'completed_at' => 'date',
        'progress' => 'integer',
        'is_milestone' => 'boolean',
        'custom_fields' => 'array',
    ];

    protected static function booted()
    {
        static::created(function ($task) {
            ActivityLog::logActivity($task, 'created', [], 'Task created');
        });

        static::updated(function ($task) {
            if ($task->isDirty('status')) {
                ActivityLog::logActivity($task, 'status_changed', [
                    'old' => $task->getOriginal('status'),
                    'new' => $task->status,
                ], "Status changed from {$task->getOriginal('status')} to {$task->status}");
                
                // Auto-update completion date
                if ($task->status === 'completed' && !$task->completed_at) {
                    $task->update(['completed_at' => now()]);
                }
            }

            if ($task->isDirty('assigned_to') && $task->assigned_to) {
                ActivityLog::logActivity($task, 'assigned', [
                    'assigned_to' => $task->assigned_to,
                ], "Task assigned to {$task->assignedTo?->name}");
            }
        });
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function hostingAccount(): BelongsTo
    {
        return $this->belongsTo(HostingAccount::class);
    }

    public function parentTask(): BelongsTo
    {
        return $this->belongsTo(Task::class, 'parent_task_id');
    }

    public function childTasks(): HasMany
    {
        return $this->hasMany(Task::class, 'parent_task_id');
    }

    public function assignedTo(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(TaskComment::class);
    }

    public function subtasks(): HasMany
    {
        return $this->hasMany(Subtask::class);
    }

    public function labels(): BelongsToMany
    {
        return $this->belongsToMany(TaskLabel::class, 'task_label_assignments');
    }

    public function dependencies(): HasMany
    {
        return $this->hasMany(TaskDependency::class);
    }

    public function dependentTasks(): HasMany
    {
        return $this->hasMany(TaskDependency::class, 'depends_on_task_id');
    }

    public function timeLogs(): HasMany
    {
        return $this->hasMany(TimeLog::class);
    }

    public function attachments(): HasMany
    {
        return $this->hasMany(TaskAttachment::class);
    }

    public function activityLogs(): MorphMany
    {
        return $this->morphMany(ActivityLog::class, 'subject');
    }

    public function isOverdue(): bool
    {
        return $this->due_date && $this->due_date->isPast() && $this->status !== 'completed';
    }

    public function updateSubtaskProgress(): void
    {
        $totalSubtasks = $this->subtasks()->count();
        $completedSubtasks = $this->subtasks()->where('is_completed', true)->count();
        
        $progress = $totalSubtasks > 0 ? round(($completedSubtasks / $totalSubtasks) * 100) : 0;
        
        $this->update(['progress' => $progress]);
    }

    public function updateActualHours(): void
    {
        $totalMinutes = $this->timeLogs()->sum('duration_minutes') ?? 0;
        $actualHours = round($totalMinutes / 60, 2);
        
        $this->update(['actual_hours' => $actualHours]);
    }

    public function canStart(): bool
    {
        // Check if all dependencies are completed
        foreach ($this->dependencies as $dependency) {
            if ($dependency->dependsOnTask->status !== 'completed') {
                return false;
            }
        }
        
        return true;
    }

    public function getActiveTimeLogAttribute(): ?TimeLog
    {
        return $this->timeLogs()->whereNull('ended_at')->first();
    }

    public function startTimer(?string $description = null): TimeLog
    {
        // Stop any existing timer
        if ($activeLog = $this->active_time_log) {
            $activeLog->stopTimer();
        }

        return $this->timeLogs()->create([
            'user_id' => auth()->user()?->id,
            'started_at' => now(),
            'description' => $description,
        ]);
    }

    public function stopTimer(): void
    {
        if ($activeLog = $this->active_time_log) {
            $activeLog->stopTimer();
        }
    }
}