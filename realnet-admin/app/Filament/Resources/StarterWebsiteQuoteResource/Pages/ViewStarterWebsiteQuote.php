<?php
// app/Filament/Resources/StarterWebsiteQuoteResource/Pages/ViewEcommerceWebsiteQuote.php

namespace App\Filament\Resources\StarterWebsiteQuoteResource\Pages;

use App\Filament\Resources\StarterWebsiteQuoteResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewStarterWebsiteQuote extends ViewRecord
{
    protected static string $resource = StarterWebsiteQuoteResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}