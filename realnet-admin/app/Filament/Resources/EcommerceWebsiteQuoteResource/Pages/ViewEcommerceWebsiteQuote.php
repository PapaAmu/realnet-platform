<?php
// app/Filament/Resources/EcommerceWebsiteQuoteResource/Pages/ViewEcommerceWebsiteQuote.php

namespace App\Filament\Resources\EcommerceWebsiteQuoteResource\Pages;

use App\Filament\Resources\EcommerceWebsiteQuoteResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewEcommerceWebsiteQuote extends ViewRecord
{
    protected static string $resource = EcommerceWebsiteQuoteResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
        ];
    }
}