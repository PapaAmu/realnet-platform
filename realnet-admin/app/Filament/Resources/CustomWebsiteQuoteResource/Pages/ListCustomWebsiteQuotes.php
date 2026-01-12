<?php

namespace App\Filament\Resources\CustomWebsiteQuoteResource\Pages;

use App\Filament\Resources\CustomWebsiteQuoteResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListCustomWebsiteQuotes extends ListRecords
{
    protected static string $resource = CustomWebsiteQuoteResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
