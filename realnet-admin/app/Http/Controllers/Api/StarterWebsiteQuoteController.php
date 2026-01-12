<?php
// app/Http/Controllers/Api/StarterWebsiteQuoteController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StarterWebsiteQuote;
use App\Models\User;
use App\Notifications\NewQuotationRequestNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class StarterWebsiteQuoteController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'projectType' => 'required|in:new,redesign,fix',
            'businessName' => 'nullable|string|max:255',
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
                    $path = $file->store('quote-attachments', 'public');
                    
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

            $quote = StarterWebsiteQuote::create([
                'project_type' => $request->input('projectType'),
                'business_name' => $request->input('businessName'),
                'description' => $request->input('description'),
                'attachments' => $attachmentsData,
                'contact_full_name' => $request->input('contact_full_name'),
                'contact_email' => $request->input('contact_email'),
                'contact_phone' => $request->input('contact_phone'),
            ]);

            // Notify Admins
            try {
                User::all()->each(function ($user) use ($quote) {
                    $user->notify(new NewQuotationRequestNotification($quote, 'Starter Website'));
                });
            } catch (\Exception $e) {
                Log::error('Failed to send notification: ' . $e->getMessage());
            }

            return response()->json([
                'success' => true,
                'message' => 'Quote request submitted successfully! We\'ll contact you within 24 hours.',
                'data' => $quote
            ], 201);

        } catch (\Exception $e) {
            Log::error('Quote submission failed: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to submit quote request. Please try again.'
            ], 500);
        }
    }

    public function show($id)
    {
        $quote = StarterWebsiteQuote::findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => $quote
        ]);
    }
}