<?php

namespace App\Filament\Widgets;

use App\Models\Quotation;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\Project;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        $totalRevenue = Payment::sum('amount');
        $pendingRevenue = Invoice::whereIn('status', ['sent', 'partially_paid', 'overdue'])->sum('amount_due');
        $paymentsToday = Payment::whereDate('payment_date', today())->sum('amount');
        
        $overdueCount = Invoice::where('status', 'overdue')->count();
        $activeProjectsCount = Project::where('status', 'active')->count();
        $pendingQuotationsCount = Quotation::where('status', 'sent')->count();
        
        return [
            Stat::make('Total Revenue (Paid)', 'R' . number_format($totalRevenue, 2))
                ->description('Total payments received')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('success')
                ->chart([7, 3, 4, 5, 6, 3, 5])
                ->extraAttributes(['class' => 'cursor-pointer']),
                
            Stat::make('Outstanding', 'R' . number_format($pendingRevenue, 2))
                ->description('Pending payments')
                ->descriptionIcon('heroicon-m-clock')
                ->color('warning')
                ->chart([3, 2, 1, 4, 3, 2, 3])
                ->extraAttributes(['class' => 'cursor-pointer']),
                
            Stat::make('Payments Today', 'R' . number_format($paymentsToday, 2))
                ->description('Received today')
                ->descriptionIcon('heroicon-m-banknotes')
                ->color('info')
                ->extraAttributes(['class' => 'cursor-pointer']),
                
            Stat::make('Active Projects', $activeProjectsCount)
                ->description('In progress')
                ->descriptionIcon('heroicon-m-briefcase')
                ->color('primary')
                ->extraAttributes(['class' => 'cursor-pointer']),
                
            Stat::make('Pending Quotations', $pendingQuotationsCount)
                ->description('Awaiting response')
                ->descriptionIcon('heroicon-m-document-text')
                ->color('gray')
                ->extraAttributes(['class' => 'cursor-pointer']),
                
            Stat::make('Overdue Invoices', $overdueCount)
                ->description('Require follow-up')
                ->descriptionIcon('heroicon-m-exclamation-triangle')
                ->color('danger')
                ->extraAttributes(['class' => 'cursor-pointer']),
        ];
    }
}
