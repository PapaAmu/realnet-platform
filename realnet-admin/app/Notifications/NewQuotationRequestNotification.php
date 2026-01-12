<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Filament\Notifications\Notification as FilamentNotification;

class NewQuotationRequestNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $quote;
    public string $type;

    /**
     * Create a new notification instance.
     */
    public function __construct($quote, string $type)
    {
        $this->quote = $quote;
        $this->type = $type;
    }

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
        $url = $this->getFilamentUrl();
        
        return (new MailMessage)
            ->subject('New ' . $this->type . ' Quote Request')
            ->greeting('Hello ' . ($notifiable->name ?? 'Admin') . '!')
            ->line('A new ' . strtolower($this->type) . ' quote request has been submitted.')
            ->line('**Client Name:** ' . ($this->quote->contact_full_name ?? $this->quote->name ?? 'N/A'))
            ->line('**Email:** ' . ($this->quote->contact_email ?? $this->quote->email ?? 'N/A'))
            ->line('**Business/Company:** ' . ($this->quote->business_name ?? $this->quote->company ?? 'N/A'))
            ->action('View Request in Admin Panel', $url)
            ->line('Please review this request as soon as possible.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'quote_id' => $this->quote->id,
            'type' => $this->type,
            'title' => 'New ' . $this->type . ' Quote',
            'body' => 'From: ' . ($this->quote->contact_full_name ?? $this->quote->name ?? 'Unknown'),
            'url' => $this->getFilamentUrl(),
            'icon' => 'heroicon-o-inbox-arrow-down',
            'color' => 'success',
        ];
    }

    protected function getFilamentUrl(): string
    {
        // Determine the Filament resource URL based on type
        // This assumes standard Filament resource routing conventions
        $baseUrl = config('app.url') . '/admin';
        
        return match($this->type) {
            'Starter Website' => "{$baseUrl}/starter-website-quotes/{$this->quote->id}",
            'Ecommerce Website' => "{$baseUrl}/ecommerce-website-quotes/{$this->quote->id}",
            'Custom Website' => "{$baseUrl}/custom-website-quotes/{$this->quote->id}",
            'General' => "{$baseUrl}/quotations/{$this->quote->id}",
            default => "{$baseUrl}/quotations",
        };
    }
}
