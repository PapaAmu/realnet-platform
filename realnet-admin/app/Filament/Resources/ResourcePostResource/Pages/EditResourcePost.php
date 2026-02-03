<?php

namespace App\Filament\Resources\ResourcePostResource\Pages;

use App\Filament\Resources\ResourcePostResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditResourcePost extends EditRecord
{
    protected static string $resource = ResourcePostResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
