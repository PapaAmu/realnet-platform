<?php

namespace App\Observers;

use App\Models\Quotation;
use App\Services\NotificationService;

class QuotationObserver
{
    /**
     * Handle the Quotation "created" event.
     */
    public function created(Quotation $quotation): void
    {
        NotificationService::notifyQuotationCreated($quotation);
    }
}
