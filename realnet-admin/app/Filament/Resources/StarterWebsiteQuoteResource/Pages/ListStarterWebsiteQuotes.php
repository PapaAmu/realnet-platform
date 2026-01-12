<?php

namespace App\Filament\Resources\StarterWebsiteQuoteResource\Pages;

use App\Filament\Resources\StarterWebsiteQuoteResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListStarterWebsiteQuotes extends ListRecords
{
    protected static string $resource = StarterWebsiteQuoteResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
