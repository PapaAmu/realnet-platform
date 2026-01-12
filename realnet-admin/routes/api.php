<?php
// routes/api.php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\QuotationController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\StarterWebsiteQuoteController;
use App\Http\Controllers\Api\EcommerceWebsiteQuoteController;
use App\Http\Controllers\Api\BlogPostController;


Route::post('/quotations', [QuotationController::class, 'store']);
Route::post('/messages', [MessageController::class, 'store']);

Route::prefix('v1')->group(function () {
    // Starter Website Quotes
    Route::post('/starter-website-quote', [StarterWebsiteQuoteController::class, 'store']);
    Route::get('/starter-website-quote/{id}', [StarterWebsiteQuoteController::class, 'show']);
    
    // Ecommerce Website Quotes
    Route::post('/ecommerce-website-quote', [EcommerceWebsiteQuoteController::class, 'store']);
    Route::get('/ecommerce-website-quote/{id}', [EcommerceWebsiteQuoteController::class, 'show']);
    Route::get('/ecommerce-website-quotes', [EcommerceWebsiteQuoteController::class, 'index']);
    Route::patch('/ecommerce-website-quote/{id}/status', [EcommerceWebsiteQuoteController::class, 'updateStatus']);

    // Custom Website Quotes
    Route::post('/custom-website-quote', [CustomWebsiteQuoteController::class, 'store']);
    Route::get('/custom-website-quote/{id}', [CustomWebsiteQuoteController::class, 'show']);
});


//Blog Post Routes
Route::prefix('blog')->group(function () {
    Route::get('/posts', [BlogPostController::class, 'index']);
    Route::get('/posts/{slug}', [BlogPostController::class, 'show']);
    Route::get('/categories', [BlogPostController::class, 'categories']);
    Route::get('/featured', [BlogPostController::class, 'featured']);
});