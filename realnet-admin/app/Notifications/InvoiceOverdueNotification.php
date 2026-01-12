<?php

namespace App\Notifications;

use App\Models\Invoice;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class InvoiceOverdueNotification extends Notification implements ShouldQueue
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
        $daysOverdue = $this->invoice->due_date 
            ? now()->diffInDays($this->invoice->due_date) 
            : 0;

        return (new MailMessage)
            ->subject('⚠️ Invoice Overdue: ' . $this->invoice->invoice_number)
            ->greeting('Hello ' . ($notifiable->name ?? 'there') . '!')
            ->line('This invoice is now overdue and requires attention.')
            ->line('**Invoice Number:** ' . $this->invoice->invoice_number)
            ->line('**Client:** ' . ($this->invoice->client?->name ?? $this->invoice->name))
            ->line('**Amount Due:** R ' . number_format($this->invoice->amount_due, 2))
            ->line('**Due Date:** ' . ($this->invoice->due_date?->format('d M Y') ?? 'Not set'))
            ->line('**Days Overdue:** ' . $daysOverdue . ' days')
            ->action('View Invoice', url('/admin/invoices/' . $this->invoice->id))
            ->line('Please follow up with the client regarding payment.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        $daysOverdue = $this->invoice->due_date 
            ? now()->diffInDays($this->invoice->due_date) 
            : 0;

        return [
            'invoice_id' => $this->invoice->id,
            'invoice_number' => $this->invoice->invoice_number,
            'amount_due' => $this->invoice->amount_due,
            'due_date' => $this->invoice->due_date?->format('Y-m-d'),
            'days_overdue' => $daysOverdue,
            'client_name' => $this->invoice->client?->name ?? $this->invoice->name,
            'title' => 'Invoice Overdue',
            'body' => "Invoice {$this->invoice->invoice_number} is {$daysOverdue} days overdue. Amount: R " . number_format($this->invoice->amount_due, 2),
            'icon' => 'heroicon-o-exclamation-triangle',
            'icon_color' => 'danger',
            'url' => '/admin/invoices/' . $this->invoice->id,
        ];
    }
}
