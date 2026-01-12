<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\Project;
use App\Models\Quotation;
use App\Models\Task;
use App\Observers\InvoiceObserver;
use App\Observers\PaymentObserver;
use App\Observers\ProjectObserver;
use App\Observers\QuotationObserver;
use App\Observers\TaskObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
            URL::forceRootUrl(config('app.url'));
        }

        // Register model observers for automatic notifications
        Invoice::observe(InvoiceObserver::class);
        Payment::observe(PaymentObserver::class);
        Project::observe(ProjectObserver::class);
        Quotation::observe(QuotationObserver::class);
        Task::observe(TaskObserver::class);
    }
}
