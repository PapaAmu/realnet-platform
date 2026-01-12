<?php
// app/Models/StarterWebsiteQuote.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StarterWebsiteQuote extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_type',
        'business_name',
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
            'new' => 'New Website',
            'redesign' => 'Redesign Website',
            'fix' => 'Fix/Improve Website',
            default => $this->project_type,
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
}