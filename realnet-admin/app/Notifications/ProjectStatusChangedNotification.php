<?php

namespace App\Notifications;

use App\Models\Project;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ProjectStatusChangedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Project $project,
        public string $oldStatus,
        public string $newStatus
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
        $statusColors = [
            'pending' => '⏳',
            'in_progress' => '🔄',
            'on_hold' => '⏸️',
            'completed' => '✅',
            'cancelled' => '❌',
        ];

        $emoji = $statusColors[$this->newStatus] ?? '📋';

        return (new MailMessage)
            ->subject($emoji . ' Project Status Update: ' . $this->project->name)
            ->greeting('Hello ' . ($notifiable->name ?? 'there') . '!')
            ->line('The status of a project has been updated.')
            ->line('**Project:** ' . $this->project->name)
            ->line('**Previous Status:** ' . ucfirst(str_replace('_', ' ', $this->oldStatus)))
            ->line('**New Status:** ' . ucfirst(str_replace('_', ' ', $this->newStatus)))
            ->line('**Progress:** ' . ($this->project->progress ?? 0) . '%')
            ->action('View Project', url('/admin/projects/' . $this->project->id))
            ->line('Thank you for staying updated!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'project_id' => $this->project->id,
            'project_name' => $this->project->name,
            'old_status' => $this->oldStatus,
            'new_status' => $this->newStatus,
            'progress' => $this->project->progress,
            'title' => 'Project Status Changed',
            'body' => "{$this->project->name} status changed from " . ucfirst(str_replace('_', ' ', $this->oldStatus)) . " to " . ucfirst(str_replace('_', ' ', $this->newStatus)),
            'icon' => 'heroicon-o-rectangle-stack',
            'icon_color' => $this->newStatus === 'completed' ? 'success' : 'primary',
            'url' => '/admin/projects/' . $this->project->id,
        ];
    }
}
