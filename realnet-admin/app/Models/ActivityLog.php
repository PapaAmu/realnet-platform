<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ActivityLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'subject_id',
        'subject_type',
        'user_id',
        'action',
        'properties',
        'description',
    ];

    protected $casts = [
        'properties' => 'array',
    ];

    public function subject(): MorphTo
    {
        return $this->morphTo();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function logActivity(
        Model $subject,
        string $action,
        array $properties = [],
        ?string $description = null
    ): self {
        return static::create([
            'subject_id' => $subject->id,
            'subject_type' => get_class($subject),
            'user_id' => auth()->id(),
            'action' => $action,
            'properties' => $properties,
            'description' => $description,
        ]);
    }
}
