<?php

namespace App\Notifications;

use App\Models\Quotation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class QuotationCreatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Quotation $quotation
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
        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('quotations.print', ['quotation' => $this->quotation]);

        return (new MailMessage)
            ->subject('New Quotation: ' . $this->quotation->quotation_number)
            ->greeting('Hello ' . ($notifiable->name ?? 'there') . '!')
            ->line('A new quotation has been prepared.')
            ->line('**Quotation Number:** ' . $this->quotation->quotation_number)
            ->line('**Service:** ' . ($this->quotation->service ?? 'Various'))
            ->line('**Amount:** R ' . number_format($this->quotation->total_amount, 2))
            ->line('**Valid Until:** ' . ($this->quotation->expiry_date?->format('d M Y') ?? 'Not set'))
            ->action('View Quotation', url('/admin/quotations/' . $this->quotation->id))
            ->attachData($pdf->output(), 'Quotation-' . $this->quotation->quotation_number . '.pdf', [
                'mime' => 'application/pdf',
            ])
            ->line('We look forward to working with you!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'quotation_id' => $this->quotation->id,
            'quotation_number' => $this->quotation->quotation_number,
            'total_amount' => $this->quotation->total_amount,
            'expiry_date' => $this->quotation->expiry_date?->format('Y-m-d'),
            'client_name' => $this->quotation->client?->name ?? $this->quotation->name,
            'title' => 'New Quotation Created',
            'body' => "Quotation {$this->quotation->quotation_number} for R " . number_format($this->quotation->total_amount, 2) . " has been created.",
            'icon' => 'heroicon-o-document-duplicate',
            'icon_color' => 'info',
            'url' => '/admin/quotations/' . $this->quotation->id,
        ];
    }
}
