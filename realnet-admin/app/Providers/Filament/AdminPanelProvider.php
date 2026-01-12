<?php

namespace App\Providers\Filament;

use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets;
use App\Filament\GlobalSearchProvider;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        // Helper to ensure HTTPS URLs for assets
        $assetUrl = function ($path) {
            $url = asset($path);
            if (app()->environment('production')) {
                $url = str_replace('http://', 'https://', $url);
            }
            return $url;
        };

        return $panel
            ->default()
            ->id('admin')
            ->brandLogo($assetUrl('images/logo.png'))
            ->brandLogoHeight('5rem')
            ->favicon($assetUrl('images/favicon.ico'))
            ->darkModeBrandLogo($assetUrl('images/logo-Dark.png'))
            ->path('admin')
            ->login()
            ->font('Poppins')
            ->colors([
                'primary' => '#025a62',
            ])
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\\Filament\\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\\Filament\\Pages')
            ->discoverClusters(in: app_path('Filament/Clusters'), for: 'App\\Filament\\Clusters')
            ->pages([
                Pages\Dashboard::class,
            ])
            ->widgets([
                //App\Filament\Widgets\CustomAccountWidget::class,
                \App\Filament\Widgets\DashboardInfoWidget::class,
                \App\Filament\Widgets\StatsOverview::class,
                \App\Filament\Widgets\ExpiringHostingAccounts::class,
                \App\Filament\Widgets\RecentInvoices::class,
                \App\Filament\Widgets\RecentPayments::class,
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ])
            ->databaseNotifications()
            ->databaseNotificationsPolling('30s')
            ->globalSearchKeyBindings(['command+k', 'ctrl+k']);
    }
}
