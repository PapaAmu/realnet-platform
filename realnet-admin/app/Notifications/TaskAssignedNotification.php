<?php

namespace App\Notifications;

use App\Models\Task;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TaskAssignedNotification extends Notification implements ShouldQueue
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
        $message = (new MailMessage)
            ->subject('Task Assigned: ' . $this->task->title)
            ->greeting('Hello ' . ($notifiable->name ?? 'there') . '!')
            ->line('You have been assigned a new task.')
            ->line('**Task:** ' . $this->task->title)
            ->line('**Project:** ' . ($this->task->project?->name ?? 'No Project'))
            ->line('**Priority:** ' . ucfirst($this->task->priority ?? 'Normal'));

        if ($this->task->due_date) {
            $message->line('**Due Date:** ' . $this->task->due_date->format('d M Y'));
        }

        if ($this->task->description) {
            $message->line('**Description:** ' . \Illuminate\Support\Str::limit($this->task->description, 150));
        }

        return $message
            ->action('View Task', url('/admin/tasks/' . $this->task->id))
            ->line('Please review and get started when ready.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'task_id' => $this->task->id,
            'task_title' => $this->task->title,
            'project_id' => $this->task->project_id,
            'project_name' => $this->task->project?->name,
            'priority' => $this->task->priority,
            'due_date' => $this->task->due_date?->format('Y-m-d'),
            'title' => 'Task Assigned',
            'body' => "You have been assigned to: {$this->task->title}",
            'icon' => 'heroicon-o-clipboard-document-check',
            'icon_color' => 'warning',
            'url' => '/admin/tasks/' . $this->task->id,
        ];
    }
}
