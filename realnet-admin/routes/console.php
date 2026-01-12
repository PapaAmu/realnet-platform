<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

/*
|--------------------------------------------------------------------------
| Scheduled Notification Commands
|--------------------------------------------------------------------------
|
| These commands run on a schedule to send reminder notifications for
| tasks and invoices. Make sure you have the Laravel scheduler running:
| * * * * * cd /path-to-project && php artisan schedule:run >> /dev/null 2>&1
|
*/

// Send task due reminders every day at 8:00 AM
Schedule::command('notifications:task-reminders --overdue')
    ->dailyAt('08:00')
    ->description('Send task due and overdue reminders');

// Mark invoices as overdue every day at 8:30 AM
Schedule::command('invoices:mark-overdue')
    ->dailyAt('08:30')
    ->description('Automatically mark overdue invoices');

// Send invoice overdue reminders every day at 9:00 AM
Schedule::command('notifications:invoice-reminders --days=3')
    ->dailyAt('09:00')
    ->description('Send invoice overdue reminders');
