<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HostingAccount extends Model
{
    protected $fillable = [
        'client_id',
        'domain_name',
        'service_type',
        'provider',
        'server_ip',
        'control_panel_url',
        'username',
        'status',
        'activation_date',
        'next_renewal_date',
        'price',
        'billing_cycle',
        'notes',
    ];

    protected $casts = [
        'activation_date' => 'date',
        'next_renewal_date' => 'date',
        'price' => 'decimal:2',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
