<?php

namespace App\Console\Commands;

use App\Models\Invoice;
use App\Services\NotificationService;
use Illuminate\Console\Command;

class SendInvoiceOverdueReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notifications:invoice-reminders {--days=3 : Days to wait before sending reminder}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send reminders for overdue invoices';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $daysThreshold = (int) $this->option('days');
        
        $this->info("Checking for invoices overdue by {$daysThreshold}+ days...");

        // First, mark any invoices as overdue that should be
        $this->call('invoices:mark-overdue');

        // Get invoices that are overdue and not paid
        $overdueInvoices = Invoice::where('status', 'overdue')
            ->whereNotNull('due_date')
            ->whereDate('due_date', '<=', now()->subDays($daysThreshold))
            ->where('amount_due', '>', 0)
            ->get();

        $sentCount = 0;
        foreach ($overdueInvoices as $invoice) {
            // Only send if email exists
            if ($invoice->email || $invoice->client?->email) {
                NotificationService::notifyInvoiceOverdue($invoice);
                $this->line("Overdue reminder sent for invoice: {$invoice->invoice_number}");
                $sentCount++;
            } else {
                $this->warn("Skipped invoice {$invoice->invoice_number} - no email address");
            }
        }

        $this->info("Sent {$sentCount} overdue invoice reminders.");

        return self::SUCCESS;
    }
}
