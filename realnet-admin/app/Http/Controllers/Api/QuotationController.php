<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Quotation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\QuotationReceivedAdmin;
use App\Mail\QuotationConfirmationUser;
use Filament\Notifications\Notification;
use Filament\Notifications\Actions\Action;
use App\Filament\Resources\QuotationResource;
use Illuminate\Support\Facades\Log;

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
            'status' => 'pending', // Default status for new API submissions
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
            'status' => 'required|string',
        ])->validate();

        $quotation = Quotation::create($validated);

        // Notify Admins and Customer
        try {
            // 1. Send Confirmation Email to Customer
            if ($quotation->email) {
                Mail::to($quotation->email)->send(new QuotationConfirmationUser($quotation));
            }

            // 2. Notify Admins
            $admins = User::all();
            foreach ($admins as $admin) {
                // Email Notification
                if ($admin->email) {
                    Mail::to($admin->email)->send(new QuotationReceivedAdmin($quotation));
                }
                
                // Database Notification (Filament Bell Icon)
                try {
                    $notification = Notification::make()
                        ->title('New Quotation Request')
                        ->body("From {$quotation->name} for {$quotation->service}")
                        ->icon('heroicon-o-currency-dollar')
                        ->success()
                        ->actions([
                            Action::make('view')
                                ->button()
                                ->url(QuotationResource::getUrl('edit', ['record' => $quotation])),
                        ]);

                    $admin->notify($notification->toDatabase());
                    Log::info('Quotation DB notification sent to admin: ' . $admin->id);
                } catch (\Exception $e) {
                    Log::error('Failed to send Quotation DB notification: ' . $e->getMessage());
                }
            }
        } catch (\Exception $e) {
            // Log error but don't fail the request
            Log::error('Failed to send notification: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => 'Quotation submitted successfully!',
            'data' => $quotation
        ], 201);
    }
}
