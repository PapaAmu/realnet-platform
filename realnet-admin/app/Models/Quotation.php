<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Client;
use App\Models\QuotationItem;

class Quotation extends Model
{
    protected $fillable = [
        'quotation_number',
        'client_id',
        'name',
        'email',
        'phone',
        'company',
        'address',
        'service',
        'project_description',
        'budget',
        'timeline',
        'reference',
        'agree_to_terms',
        'additional_details',
        'preferred_contact_method',
        'project_type',
        'urgency',
        'issue_date',
        'expiry_date',
        'status',
        'subtotal',
        'tax_rate',
        'tax_amount',
        'total_amount',
        'notes',
        'terms',
        'banking_details',
    ];

    protected $casts = [
        'agree_to_terms' => 'boolean',
        'features' => 'array',
        'issue_date' => 'date',
        'expiry_date' => 'date',
        'subtotal' => 'decimal:2',
        'tax_rate' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'total_amount' => 'decimal:2',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($quotation) {
            if (empty($quotation->quotation_number)) {
                do {
                    $number = random_int(100000, 999999);
                    $quotationNumber = 'QT-' . date('Y') . '-' . $number;
                } while (static::where('quotation_number', $quotationNumber)->exists());
                $quotation->quotation_number = $quotationNumber;
            }
            
            // Set default values to prevent null constraint violations
            if (!isset($quotation->tax_rate) || $quotation->tax_rate === null) {
                $quotation->tax_rate = 0;
            }
            
            if (!isset($quotation->tax_amount) || $quotation->tax_amount === null) {
                $quotation->tax_amount = 0;
            }
            
            if (!isset($quotation->subtotal) || $quotation->subtotal === null) {
                $quotation->subtotal = 0;
            }
            
            if (!isset($quotation->total_amount) || $quotation->total_amount === null) {
                $quotation->total_amount = $quotation->subtotal ?? 0;
            }
        });
    }

    public function client(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function items(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(QuotationItem::class);
    }
}