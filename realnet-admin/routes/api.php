<?php
// routes/api.php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\QuotationController;
use App\Http\Controllers\Api\MessageController;


use App\Http\Controllers\Api\BlogPostController;
use App\Http\Controllers\Api\ResourcePostController;


Route::post('/quotations', [QuotationController::class, 'store']);
Route::post('/messages', [MessageController::class, 'store']);

Route::prefix('v1')->group(function () {
    // Legacy routes removed or redirected if needed
});


//Blog Post Routes
Route::prefix('blog')->group(function () {
    Route::get('/posts', [BlogPostController::class, 'index']);
    Route::get('/posts/{slug}', [BlogPostController::class, 'show']);
    Route::get('/categories', [BlogPostController::class, 'categories']);
    Route::get('/featured', [BlogPostController::class, 'featured']);
});

// Resource Post Routes
Route::prefix('resources')->group(function () {
    Route::get('/posts', [ResourcePostController::class, 'index']);
    Route::get('/posts/featured', [ResourcePostController::class, 'featured']);
    Route::get('/categories', [ResourcePostController::class, 'categories']);
    Route::get('/posts/{slug}', [ResourcePostController::class, 'show']);
});