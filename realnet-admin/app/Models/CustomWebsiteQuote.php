<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomWebsiteQuote extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_type',
        'business_name',
        'industry',
        'timeline',
        'budget_range',
        'features',
        'technical_requirements',
        'description',
        'attachments',
        'contact_full_name',
        'contact_email',
        'contact_phone',
        'contact_company_role',
        'status',
    ];

    protected $casts = [
        'features' => 'array',
        'attachments' => 'array',
    ];

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
}
