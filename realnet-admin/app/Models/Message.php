<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

class Message extends Model
{
    protected $fillable = ['name', 'email', 'subject', 'message'];
    
    protected $casts = [
        'is_read' => 'boolean',
    ];
    
    protected $attributes = [
        'is_read' => false,
    ];
    
    protected static function boot()
    {
        parent::boot();
        
        static::saving(function ($model) {
            if (!Schema::hasColumn($model->getTable(), 'is_read')) {
                unset($model->is_read);
            }
        });
    }
    
    // Add accessor to prevent errors when is_read doesn't exist
    public function getIsReadAttribute($value)
    {
        if (!Schema::hasColumn($this->getTable(), 'is_read')) {
            return false;
        }
        
        return $value;
    }
}