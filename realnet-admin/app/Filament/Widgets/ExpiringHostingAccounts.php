<?php

namespace App\Filament\Widgets;

use App\Models\HostingAccount;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class ExpiringHostingAccounts extends BaseWidget
{
    protected int | string | array $columnSpan = 'full';

    protected static ?int $sort = 10;

    public function table(Table $table): Table
    {
        return $table
            ->query(
                HostingAccount::query()
                    ->where('status', 'active')
                    ->where('next_renewal_date', '>=', now())
                    ->where('next_renewal_date', '<=', now()->addDays(30))
                    ->orderBy('next_renewal_date', 'asc')
            )
            ->heading('Expiring Hosting & Services')
            ->description('Services expiring in the next 30 days')
            ->columns([
                Tables\Columns\TextColumn::make('client.name')
                    ->label('Client'),
                Tables\Columns\TextColumn::make('domain_name')
                    ->weight('bold')
                    ->searchable(),
                Tables\Columns\TextColumn::make('service_type')
                    ->badge(),
                Tables\Columns\TextColumn::make('next_renewal_date')
                    ->date()
                    ->label('Renewal Date')
                    ->color('danger')
                    ->icon('heroicon-o-calendar'),
                Tables\Columns\TextColumn::make('price')
                    ->money('ZAR')
                    ->label('Cost'),
            ])
            ->actions([
                Tables\Actions\Action::make('open')
                    ->url(fn (HostingAccount $record): string => \App\Filament\Resources\HostingAccountResource::getUrl('edit', ['record' => $record]))
                    ->icon('heroicon-o-arrow-top-right-on-square')
                    ->label('Manage'),
            ]);
    }
}
