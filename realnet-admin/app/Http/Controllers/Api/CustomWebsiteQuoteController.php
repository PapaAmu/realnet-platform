<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CustomWebsiteQuote;
use App\Models\User;
use App\Notifications\NewQuotationRequestNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class CustomWebsiteQuoteController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'projectType' => 'required|string',
                'contact_email' => 'required|email',
                'contact_full_name' => 'required|string',
                'contact_phone' => 'required|string',
                // Add other validations as needed
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors()
                ], 422);
            }

            // Handle File Uploads
            $attachmentsData = [];
            if ($request->hasFile('attachments')) {
                foreach ($request->file('attachments') as $file) {
                    $path = $file->store('quote-attachments', 'public');
                    $attachmentsData[] = [
                        'name' => $file->getClientOriginalName(),
                        'path' => $path,
                        'url' => Storage::url($path),
                        'size' => $file->getSize(),
                        'type' => $file->getMimeType(),
                        'uploaded_at' => now()->toISOString(),
                    ];
                }
            }

            $quote = CustomWebsiteQuote::create([
                'project_type' => $request->input('projectType'),
                'business_name' => $request->input('businessName'),
                'industry' => $request->input('industry'),
                'timeline' => $request->input('timeline'),
                'budget_range' => $request->input('budgetRange'),
                'features' => json_decode($request->input('features'), true) ?? [], // Frontend might send as stringified JSON or array
                'technical_requirements' => $request->input('technicalRequirements'),
                'description' => $request->input('description'),
                'attachments' => $attachmentsData,
                'contact_full_name' => $request->input('contact_full_name'),
                'contact_email' => $request->input('contact_email'),
                'contact_phone' => $request->input('contact_phone'),
                'contact_company_role' => $request->input('contact_company_role'),
            ]);

            // Log the submission
            Log::info('New custom website quote submitted', [
                'id' => $quote->id,
                'business_name' => $quote->business_name,
                'contact_email' => $quote->contact_email,
            ]);

            // Notify Admins
            try {
                User::all()->each(function ($user) use ($quote) {
                    $user->notify(new NewQuotationRequestNotification($quote, 'Custom Website'));
                });
            } catch (\Exception $e) {
                Log::error('Failed to send notification: ' . $e->getMessage());
            }

            return response()->json([
                'success' => true,
                'message' => 'Custom website quote request submitted successfully! We\'ll contact you within 24 hours.',
                'data' => $quote
            ], 201);

        } catch (\Exception $e) {
            Log::error('Custom quote submission failed: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to submit quote request. Please try again. ' . $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $quote = CustomWebsiteQuote::find($id);

        if (!$quote) {
            return response()->json([
                'success' => false,
                'message' => 'Quote not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $quote
        ]);
    }
}
