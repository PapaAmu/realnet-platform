<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMessageReceivedAdmin;
use App\Mail\ContactMessageConfirmationUser;
use Filament\Notifications\Notification;
use Filament\Notifications\Actions\Action;
use App\Filament\Resources\MessageResource;
use Illuminate\Support\Facades\Log;

class MessageController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $message = Message::create($validated);

        Log::info('Message created: ' . $message->id);

        // Notify Admins and Customer
        try {
            // 1. Send Confirmation Email to Customer
            if ($message->email) {
                Mail::to($message->email)->send(new ContactMessageConfirmationUser($message));
                Log::info('Confirmation email sent to: ' . $message->email);
            }

            // 2. Notify Admins
            $admins = User::all();
            Log::info('Found ' . $admins->count() . ' admins.');

            foreach ($admins as $admin) {
                // Email Notification
                if ($admin->email) {
                    Mail::to($admin->email)->send(new ContactMessageReceivedAdmin($message));
                    Log::info('Admin email sent to: ' . $admin->email);
                }
                
                // Database Notification (Filament Bell Icon)
                try {
                    $notification = Notification::make()
                        ->title('New Contact Message')
                        ->body("From {$message->name}: {$message->subject}")
                        ->icon('heroicon-o-chat-bubble-left-right')
                        ->info()
                        ->actions([
                            Action::make('view')
                                ->button()
                                ->url(MessageResource::getUrl('view', ['record' => $message])),
                        ]);
                    
                    // Send using the User's notify method to ensure correct type is stored
                    $admin->notify($notification->toDatabase());
                    
                    Log::info('Database notification sent to admin: ' . $admin->id);
                } catch (\Exception $e) {
                    Log::error('Failed to send DB notification to admin ' . $admin->id . ': ' . $e->getMessage());
                    Log::error($e->getTraceAsString());
                }
            }
        } catch (\Exception $e) {
            // Log error but don't fail the request
            Log::error('Failed to send contact message notification: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => 'Message submitted successfully!',
            'data'    => $message
        ], 201);
    }
}

