<?php

use Illuminate\Support\Facades\Route;

Route::redirect('/', '/admin/login');

Route::get('/quotations/{quotation}/print', [App\Http\Controllers\QuotationController::class, 'print'])->name('quotation.print');
Route::get('/invoices/{invoice}/print', [App\Http\Controllers\InvoiceController::class, 'print'])->name('invoice.print');
Route::get('/payments/{payment}/receipt', [App\Http\Controllers\PaymentController::class, 'receipt'])->name('payment.receipt');
