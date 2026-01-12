<?php
// app/Filament/Resources/EcommerceWebsiteQuoteResource/Pages/EditEcommerceWebsiteQuote.php

namespace App\Filament\Resources\EcommerceWebsiteQuoteResource\Pages;

use App\Filament\Resources\EcommerceWebsiteQuoteResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditEcommerceWebsiteQuote extends EditRecord
{
    protected static string $resource = EcommerceWebsiteQuoteResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }
}