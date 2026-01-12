<?php

namespace App\Console\Commands;

use App\Models\Invoice;
use Illuminate\Console\Command;

class MarkOverdueInvoices extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'invoices:mark-overdue';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Automatically mark invoices as overdue based on due date';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Checking for overdue invoices...');

        // Get invoices that should be marked as overdue
        $invoicesToMark = Invoice::whereNotIn('status', ['paid', 'cancelled', 'overdue'])
            ->whereNotNull('due_date')
            ->whereDate('due_date', '<', now())
            ->where('amount_due', '>', 0)
            ->get();

        $count = 0;
        foreach ($invoicesToMark as $invoice) {
            $invoice->markAsOverdue();
            $count++;
            $this->line("Marked invoice {$invoice->invoice_number} as overdue");
        }

        $this->info("Marked {$count} invoice(s) as overdue.");

        return self::SUCCESS;
    }
}

