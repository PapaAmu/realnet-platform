<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Credential extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'service_name',
        'type',
        'url',
        'username',
        'password',
        'notes',
    ];

    protected $casts = [
        'password' => 'encrypted', // Automatically encrypt/decrypt
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
