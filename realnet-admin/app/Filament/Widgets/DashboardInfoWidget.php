<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;

class DashboardInfoWidget extends Widget
{
    protected static string $view = 'filament.widgets.dashboard-info-widget';

    protected static ?int $sort = 1;

    protected int | string | array $columnSpan = 1;
}
