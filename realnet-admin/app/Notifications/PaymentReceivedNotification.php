<?php

namespace App\Notifications;

use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PaymentReceivedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Payment $payment
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
        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('payments.receipt', ['payment' => $this->payment]);

        return (new MailMessage)
            ->subject('Payment Received - R ' . number_format($this->payment->amount, 2))
            ->greeting('Hello ' . ($notifiable->name ?? 'there') . '!')
            ->line('We have received a payment. Thank you!')
            ->line('**Amount:** R ' . number_format($this->payment->amount, 2))
            ->line('**Invoice:** ' . ($this->payment->invoice?->invoice_number ?? 'N/A'))
            ->line('**Payment Method:** ' . ucfirst($this->payment->payment_method ?? 'Not specified'))
            ->line('**Date:** ' . ($this->payment->payment_date?->format('d M Y') ?? now()->format('d M Y')))
            ->action('View Payment Details', url('/admin/payments/' . $this->payment->id))
            ->attachData($pdf->output(), 'Receipt-' . ($this->payment->payment_number ?? $this->payment->id) . '.pdf', [
                'mime' => 'application/pdf',
            ])
            ->line('Thank you for your business!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'payment_id' => $this->payment->id,
            'amount' => $this->payment->amount,
            'invoice_id' => $this->payment->invoice_id,
            'invoice_number' => $this->payment->invoice?->invoice_number,
            'payment_method' => $this->payment->payment_method,
            'title' => 'Payment Received',
            'body' => 'Payment of R ' . number_format($this->payment->amount, 2) . ' has been received.',
            'icon' => 'heroicon-o-banknotes',
            'icon_color' => 'success',
            'url' => '/admin/payments/' . $this->payment->id,
        ];
    }
}
