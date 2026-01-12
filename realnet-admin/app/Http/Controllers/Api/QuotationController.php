<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Quotation;
use Illuminate\Http\Request;

class QuotationController extends Controller
{
    public function store(Request $request)
    {
        // Transform camelCase to snake_case for validation
        $transformedData = [
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'company' => $request->company,
            'service' => $request->service,
            'project_description' => $request->projectDescription,
            'budget' => $request->budget,
            'timeline' => $request->timeline,
            'reference' => $request->reference,
            'agree_to_terms' => $request->agreeToTerms,
            'additional_details' => $request->additionalDetails,
            'preferred_contact_method' => $request->preferredContactMethod,
            'project_type' => $request->projectType,
            'urgency' => $request->urgency,
        ];

        $validated = validator($transformedData, [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'service' => 'required|string|max:255',
            'project_description' => 'required|string',
            'budget' => 'nullable|string|max:255',
            'timeline' => 'nullable|string|max:255',
            'reference' => 'nullable|string|max:255',
            'agree_to_terms' => 'required|boolean',
            'additional_details' => 'nullable|string',
            'preferred_contact_method' => 'nullable|string|max:255',
            'project_type' => 'nullable|string|max:255',
            'urgency' => 'nullable|string|max:255',
        ])->validate();

        $quotation = Quotation::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Quotation submitted successfully!',
            'data' => $quotation
        ], 201);
    }
}