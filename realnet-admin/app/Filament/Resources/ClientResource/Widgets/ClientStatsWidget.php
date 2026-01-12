<?php

namespace App\Filament\Resources\ClientResource\Widgets;

use App\Models\Client;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class ClientStatsWidget extends BaseWidget
{
    protected function getStats(): array
    {
        $totalClients = Client::count();
        $activeClients = Client::where('status', 'active')->count();
        $nonActiveClients = Client::where('status', '!=', 'active')->count();
        
        return [
            Stat::make('Total Clients', $totalClients)
                ->description('All clients in the system')
                ->descriptionIcon('heroicon-m-building-office-2')
                ->color('primary')
                ->chart($this->getClientChartData())
                ->extraAttributes(['class' => 'cursor-pointer']),
                
            Stat::make('Active Clients', $activeClients)
                ->description('Currently active')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('success')
                ->extraAttributes(['class' => 'cursor-pointer']),
                
            Stat::make('Non-Active Clients', $nonActiveClients)
                ->description('Inactive or leads')
                ->descriptionIcon('heroicon-m-pause-circle')
                ->color('gray')
                ->extraAttributes(['class' => 'cursor-pointer']),
        ];
    }

    protected function getClientChartData(): array
    {
        // Get client counts for the last 7 days
        $data = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $data[] = Client::whereDate('created_at', '<=', $date)->count();
        }
        return $data;
    }
}

