<?php
// app/Http/Controllers/Api/EcommerceWebsiteQuoteController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EcommerceWebsiteQuote;
use App\Models\User;
use App\Notifications\NewQuotationRequestNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class EcommerceWebsiteQuoteController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'projectType' => 'required|in:new,redesign,improve',
            'businessName' => 'nullable|string|max:255',
            'productsCount' => 'required|in:1-50,51-100,101-200,200+',
            'description' => 'required|string|min:10',
            'contact_full_name' => 'required|string|max:255',
            'contact_email' => 'required|email',
            'contact_phone' => 'required|string|max:20',
            'attachments' => 'nullable|array',
            'attachments.*' => 'file|max:10240', // 10MB max per file
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $attachmentsData = [];
            if ($request->hasFile('attachments')) {
                foreach ($request->file('attachments') as $file) {
                    $path = $file->store('ecommerce-quote-attachments', 'public');
                    
                    $attachmentsData[] = [
                        'id' => uniqid(),
                        'name' => $file->getClientOriginalName(),
                        'path' => $path,
                        'size' => $file->getSize(),
                        'mime_type' => $file->getMimeType(),
                        'uploaded_at' => now()->toISOString(),
                    ];
                }
            }

            $quote = EcommerceWebsiteQuote::create([
                'project_type' => $request->input('projectType'),
                'business_name' => $request->input('businessName'),
                'products_count' => $request->input('productsCount'),
                'description' => $request->input('description'),
                'attachments' => $attachmentsData,
                'contact_full_name' => $request->input('contact_full_name'),
                'contact_email' => $request->input('contact_email'),
                'contact_phone' => $request->input('contact_phone'),
            ]);

            // Log the submission for admin notification
            Log::info('New ecommerce website quote submitted', [
                'id' => $quote->id,
                'business_name' => $quote->business_name,
                'contact_email' => $quote->contact_email,
                'project_type' => $quote->project_type_label,
            ]);

            // Notify Admins
            try {
                User::all()->each(function ($user) use ($quote) {
                    $user->notify(new NewQuotationRequestNotification($quote, 'Ecommerce Website'));
                });
            } catch (\Exception $e) {
                Log::error('Failed to send notification: ' . $e->getMessage());
            }

            return response()->json([
                'success' => true,
                'message' => 'Ecommerce store quote request submitted successfully! We\'ll contact you within 24 hours.',
                'data' => $quote
            ], 201);

        } catch (\Exception $e) {
            Log::error('Ecommerce quote submission failed: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to submit quote request. Please try again.'
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $quote = EcommerceWebsiteQuote::findOrFail($id);
            
            return response()->json([
                'success' => true,
                'data' => $quote
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Quote not found'
            ], 404);
        }
    }

    public function index(Request $request)
    {
        try {
            $quotes = EcommerceWebsiteQuote::orderBy('created_at', 'desc')->get();
            
            return response()->json([
                'success' => true,
                'data' => $quotes
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve quotes'
            ], 500);
        }
    }

    public function updateStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:new,contacted,quoted,accepted,rejected'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $quote = EcommerceWebsiteQuote::findOrFail($id);
            $quote->update(['status' => $request->input('status')]);

            return response()->json([
                'success' => true,
                'message' => 'Quote status updated successfully',
                'data' => $quote
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update quote status'
            ], 500);
        }
    }
}