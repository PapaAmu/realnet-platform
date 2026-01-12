<?php

namespace App\Notifications;

use App\Models\Invoice;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class InvoiceCreatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Invoice $invoice
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
        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('invoices.print', ['invoice' => $this->invoice]);

        return (new MailMessage)
            ->subject('New Invoice: ' . $this->invoice->invoice_number)
            ->greeting('Hello ' . ($notifiable->name ?? 'there') . '!')
            ->line('A new invoice has been created.')
            ->line('**Invoice Number:** ' . $this->invoice->invoice_number)
            ->line('**Amount:** R ' . number_format($this->invoice->total_amount, 2))
            ->line('**Due Date:** ' . ($this->invoice->due_date?->format('d M Y') ?? 'Not set'))
            ->action('View Invoice', url('/admin/invoices/' . $this->invoice->id))
            ->attachData($pdf->output(), 'Invoice-' . $this->invoice->invoice_number . '.pdf', [
                'mime' => 'application/pdf',
            ])
            ->line('Thank you for your hard work!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'invoice_id' => $this->invoice->id,
            'invoice_number' => $this->invoice->invoice_number,
            'total_amount' => $this->invoice->total_amount,
            'due_date' => $this->invoice->due_date?->format('Y-m-d'),
            'client_name' => $this->invoice->client?->name ?? $this->invoice->name,
            'title' => 'New Invoice Created',
            'body' => "Invoice {$this->invoice->invoice_number} for R " . number_format($this->invoice->total_amount, 2) . " has been created.",
            'icon' => 'heroicon-o-document-text',
            'icon_color' => 'success',
            'url' => '/admin/invoices/' . $this->invoice->id,
        ];
    }
}
