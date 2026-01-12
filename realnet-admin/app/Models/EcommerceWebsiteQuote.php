<?php
// app/Models/EcommerceWebsiteQuote.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EcommerceWebsiteQuote extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_type',
        'business_name',
        'products_count',
        'description',
        'attachments',
        'contact_full_name',
        'contact_email',
        'contact_phone',
        'status',
    ];

    protected $casts = [
        'attachments' => 'array',
    ];

    // Helper methods for project type
    public function getProjectTypeLabelAttribute()
    {
        return match($this->project_type) {
            'new' => 'New Ecommerce Store',
            'redesign' => 'Redesign Store',
            'improve' => 'Add Ecommerce',
            default => $this->project_type,
        };
    }

    // Helper methods for products count
    public function getProductsCountLabelAttribute()
    {
        return match($this->products_count) {
            '1-50' => '1-50 products',
            '51-100' => '51-100 products',
            '101-200' => '101-200 products',
            '200+' => '200+ products',
            default => $this->products_count,
        };
    }

    public function getStatusColorAttribute()
    {
        return match($this->status) {
            'new' => 'primary',
            'contacted' => 'info',
            'quoted' => 'warning',
            'accepted' => 'success',
            'rejected' => 'danger',
            default => 'gray',
        };
    }

    // Scope for new quotes
    public function scopeNew($query)
    {
        return $query->where('status', 'new');
    }

    // Scope for contacted quotes
    public function scopeContacted($query)
    {
        return $query->where('status', 'contacted');
    }
}