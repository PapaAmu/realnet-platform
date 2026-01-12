<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

class TimeLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'task_id',
        'user_id',
        'started_at',
        'ended_at',
        'duration_minutes',
        'description',
        'billable',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
        'duration_minutes' => 'integer',
        'billable' => 'boolean',
    ];

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function stopTimer(): void
    {
        if (!$this->ended_at) {
            $this->ended_at = now();
            $this->duration_minutes = $this->started_at->diffInMinutes($this->ended_at);
            $this->save();
            
            // Update task actual hours
            $this->task->updateActualHours();
        }
    }

    public function getDurationFormattedAttribute(): string
    {
        if (!$this->duration_minutes) {
            return '0h 0m';
        }
        
        $hours = floor($this->duration_minutes / 60);
        $minutes = $this->duration_minutes % 60;
        
        return "{$hours}h {$minutes}m";
    }

    public function isRunning(): bool
    {
        return is_null($this->ended_at);
    }
}
