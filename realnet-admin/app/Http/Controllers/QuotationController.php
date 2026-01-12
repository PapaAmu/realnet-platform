<?php

namespace App\Http\Controllers;

use App\Models\Quotation;
use Illuminate\Http\Request;

class QuotationController extends Controller
{
    public function print(Quotation $quotation)
    {
        return view('quotations.print', compact('quotation'));
    }
}
