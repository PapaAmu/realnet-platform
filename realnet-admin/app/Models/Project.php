<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Project extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'project_code',
        'client_id',
        'description',
        'status',
        'priority',
        'start_date',
        'deadline',
        'budget',
        'actual_budget',
        'progress',
        'owner_id',
        'is_template',
        'completed_at',
        'custom_fields',
    ];

    protected $casts = [
        'start_date' => 'date',
        'deadline' => 'date',
        'completed_at' => 'date',
        'budget' => 'decimal:2',
        'actual_budget' => 'decimal:2',
        'is_template' => 'boolean',
        'custom_fields' => 'array',
    ];

    protected static function booted()
    {
        static::creating(function ($project) {
            if (!$project->project_code) {
                $project->project_code = 'PRJ-' . str_pad((Project::max('id') ?? 0) + 1, 5, '0', STR_PAD_LEFT);
            }
        });

        static::created(function ($project) {
            ActivityLog::logActivity($project, 'created', [], 'Project created');
        });

        static::updated(function ($project) {
            if ($project->isDirty('status')) {
                ActivityLog::logActivity($project, 'status_changed', [
                    'old' => $project->getOriginal('status'),
                    'new' => $project->status,
                ], "Status changed from {$project->getOriginal('status')} to {$project->status}");
            }
        });
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    public function members(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'project_members')
            ->withPivot('role')
            ->withTimestamps();
    }

    public function completedTasks(): HasMany
    {
        return $this->hasMany(Task::class)->where('status', 'completed');
    }

    public function pendingTasks(): HasMany
    {
        return $this->hasMany(Task::class)->where('status', '!=', 'completed');
    }

    public function attachments(): HasMany
    {
        return $this->hasMany(ProjectAttachment::class);
    }

    public function activityLogs(): MorphMany
    {
        return $this->morphMany(ActivityLog::class, 'subject');
    }

    public function client(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function updateProgress(): void
    {
        $totalTasks = $this->tasks()->count();
        $completedTasks = $this->completedTasks()->count();
        
        $progress = $totalTasks > 0 ? round(($completedTasks / $totalTasks) * 100) : 0;
        
        $this->update(['progress' => $progress]);
        
        // Auto complete project when all tasks are done
        if ($progress === 100 && $this->status !== 'completed') {
            $this->update([
                'status' => 'completed',
                'completed_at' => now(),
            ]);
        }
    }

    public function getBudgetVarianceAttribute(): ?float
    {
        if (!$this->budget || !$this->actual_budget) {
            return null;
        }
        
        return $this->budget - $this->actual_budget;
    }

    public function isOverdue(): bool
    {
        return $this->deadline && $this->deadline->isPast() && $this->status !== 'completed';
    }

    public function getTotalEstimatedHoursAttribute(): int
    {
        return $this->tasks()->sum('estimated_hours') ?? 0;
    }

    public function getTotalActualHoursAttribute(): int
    {
        return $this->tasks()->sum('actual_hours') ?? 0;
    }
}