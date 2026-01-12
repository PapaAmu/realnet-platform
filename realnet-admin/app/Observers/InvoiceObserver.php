<?php

namespace App\Observers;

use App\Models\Invoice;
use App\Services\NotificationService;

class InvoiceObserver
{
    /**
     * Handle the Invoice "created" event.
     */
    public function created(Invoice $invoice): void
    {
        NotificationService::notifyInvoiceCreated($invoice);
    }

    /**
     * Handle the Invoice "updated" event.
     */
    public function updated(Invoice $invoice): void
    {
        // Check if invoice just became overdue
        if ($invoice->wasChanged('status') && $invoice->status === 'overdue') {
            // Only notify if email exists
            if ($invoice->email || $invoice->client?->email) {
                NotificationService::notifyInvoiceOverdue($invoice);
            }
        }

        // Auto-mark as overdue if due date passed
        if ($invoice->isOverdue() && $invoice->status !== 'overdue' && !in_array($invoice->status, ['paid', 'cancelled'])) {
            $invoice->markAsOverdue();
        }
    }
}
