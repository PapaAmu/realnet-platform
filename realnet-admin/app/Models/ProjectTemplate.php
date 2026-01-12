<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectTemplate extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'template_data',
        'created_by',
        'is_active',
    ];

    protected $casts = [
        'template_data' => 'array',
        'is_active' => 'boolean',
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function createProjectFromTemplate(array $overrides = []): Project
    {
        $templateData = $this->template_data;
        
        // Create the project
        $project = Project::create(array_merge(
            $templateData['project'] ?? [],
            $overrides
        ));

        // Create tasks from template
        if (isset($templateData['tasks'])) {
            foreach ($templateData['tasks'] as $taskData) {
                $task = $project->tasks()->create($taskData);
                
                // Create subtasks if any
                if (isset($taskData['subtasks'])) {
                    foreach ($taskData['subtasks'] as $subtaskData) {
                        $task->subtasks()->create($subtaskData);
                    }
                }
            }
        }

        return $project;
    }
}
