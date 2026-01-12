<?php

namespace App\Observers;

use App\Models\Task;
use App\Services\NotificationService;

class TaskObserver
{
    /**
     * Handle the Task "created" event.
     */
    public function created(Task $task): void
    {
        // Notify assigned user when a task is created and already assigned
        if ($task->assigned_to) {
            NotificationService::notifyTaskAssigned($task);
        }
    }

    /**
     * Handle the Task "updated" event.
     */
    public function updated(Task $task): void
    {
        // Notify user if task was just assigned to them
        if ($task->wasChanged('assigned_to') && $task->assigned_to) {
            NotificationService::notifyTaskAssigned($task);
        }
    }
}
