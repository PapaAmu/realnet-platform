<?php

namespace App\Notifications;

use App\Models\Task;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TaskDueReminderNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Task $task
    ) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $isOverdue = $this->task->due_date && $this->task->due_date->isPast();
        
        $subject = $isOverdue 
            ? '⚠️ OVERDUE Task: ' . $this->task->title
            : '⏰ Task Due Soon: ' . $this->task->title;

        return (new MailMessage)
            ->subject($subject)
            ->greeting('Hello ' . ($notifiable->name ?? 'there') . '!')
            ->line($isOverdue 
                ? 'This task is now overdue and requires immediate attention.' 
                : 'This is a reminder that a task is due soon.')
            ->line('**Task:** ' . $this->task->title)
            ->line('**Project:** ' . ($this->task->project?->name ?? 'No Project'))
            ->line('**Due Date:** ' . $this->task->due_date->format('d M Y'))
            ->line('**Priority:** ' . ucfirst($this->task->priority ?? 'Normal'))
            ->line('**Status:** ' . ucfirst(str_replace('_', ' ', $this->task->status ?? 'pending')))
            ->action('View Task', url('/admin/tasks/' . $this->task->id))
            ->line($isOverdue 
                ? 'Please complete this task as soon as possible.' 
                : 'Please ensure you complete this task on time.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        $isOverdue = $this->task->due_date && $this->task->due_date->isPast();
        
        return [
            'task_id' => $this->task->id,
            'task_title' => $this->task->title,
            'project_id' => $this->task->project_id,
            'project_name' => $this->task->project?->name,
            'due_date' => $this->task->due_date?->format('Y-m-d'),
            'is_overdue' => $isOverdue,
            'title' => $isOverdue ? 'Task Overdue' : 'Task Due Soon',
            'body' => $isOverdue 
                ? "Task '{$this->task->title}' is overdue!" 
                : "Task '{$this->task->title}' is due on " . $this->task->due_date->format('d M Y'),
            'icon' => 'heroicon-o-clock',
            'icon_color' => $isOverdue ? 'danger' : 'warning',
            'url' => '/admin/tasks/' . $this->task->id,
        ];
    }
}
