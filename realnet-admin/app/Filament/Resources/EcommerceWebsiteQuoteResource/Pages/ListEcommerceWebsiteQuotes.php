<?php
// app/Filament/Resources/EcommerceWebsiteQuoteResource/Pages/ListEcommerceWebsiteQuotes.php

namespace App\Filament\Resources\EcommerceWebsiteQuoteResource\Pages;

use App\Filament\Resources\EcommerceWebsiteQuoteResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListEcommerceWebsiteQuotes extends ListRecords
{
    protected static string $resource = EcommerceWebsiteQuoteResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}