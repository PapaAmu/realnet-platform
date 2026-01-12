<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function receipt(Payment $payment)
    {
        return view('payments.receipt', compact('payment'));
    }
}
