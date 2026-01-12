<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Invoice extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'invoice_number',
        'quotation_id',
        'client_id',
        'name',
        'email',
        'phone',
        'company',
        'address',
        'issue_date',
        'due_date',
        'status',
        'subtotal',
        'tax_rate',
        'tax_amount',
        'total_amount',
        'amount_paid',
        'amount_due',
        'notes',
        'terms',
        'banking_details',
    ];

    protected $casts = [
        'issue_date' => 'date',
        'due_date' => 'date',
        'subtotal' => 'decimal:2',
        'tax_rate' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'amount_paid' => 'decimal:2',
        'amount_due' => 'decimal:2',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($invoice) {
            if (empty($invoice->invoice_number)) {
                do {
                    $number = random_int(100000, 999999);
                    $invoiceNumber = 'INV-' . date('Y') . '-' . $number;
                } while (static::where('invoice_number', $invoiceNumber)->exists());
                $invoice->invoice_number = $invoiceNumber;
            }
            
            // Set default values to prevent null constraint violations
            if (!isset($invoice->amount_paid) || $invoice->amount_paid === null) {
                $invoice->amount_paid = 0;
            }
            
            if (!isset($invoice->amount_due) || $invoice->amount_due === null) {
                $invoice->amount_due = $invoice->total_amount ?? 0;
            }
        });
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function quotation(): BelongsTo
    {
        return $this->belongsTo(Quotation::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(InvoiceItem::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function updatePaymentStatus(): void
    {
        $totalPaid = $this->payments()->sum('amount');
        $this->amount_paid = $totalPaid;
        $this->amount_due = $this->total_amount - $totalPaid;

        if ($totalPaid >= $this->total_amount) {
            $this->status = 'paid';
        } elseif ($totalPaid > 0) {
            $this->status = 'partially_paid';
        } elseif ($this->status === 'paid' && $totalPaid < $this->total_amount) {
            // If status was paid but payment was deleted, revert status
            $this->status = $this->isOverdue() ? 'overdue' : 'sent';
        }

        // Auto-update overdue status
        if ($this->isOverdue() && !in_array($this->status, ['paid', 'cancelled'])) {
            $this->status = 'overdue';
        }

        $this->save();
    }

    public function isOverdue(): bool
    {
        return $this->due_date && $this->due_date->isPast() && $this->status !== 'paid';
    }

    public function markAsOverdue(): void
    {
        if ($this->isOverdue() && $this->status !== 'overdue') {
            $this->update(['status' => 'overdue']);
        }
    }
}
