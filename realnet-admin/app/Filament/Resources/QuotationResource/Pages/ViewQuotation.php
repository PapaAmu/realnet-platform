<?php

namespace App\Filament\Resources\QuotationResource\Pages;

use App\Filament\Resources\QuotationResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewQuotation extends ViewRecord
{
    protected static string $resource = QuotationResource::class;

    public function getActions(): array // Make sure this is public
    {
        return [
            Actions\EditAction::make(),
        ];
    }

    public function getRecordTitle(): string // Change to public
    {
        return $this->record->name;
    }

    public function getRecordDetails(): array // Change to public
    {
        return [
            'Category' => $this->record->category,
            'Label' => $this->record->label,
            'Service' => $this->record->service,
            'Name' => $this->record->name,
            'Email' => $this->record->email,
            'Phone' => $this->record->phone,
            'Message' => $this->record->message,
            'Questionnaire Answers' => json_encode($this->record->questionnaire_answers, JSON_PRETTY_PRINT),
        ];
    }
}


