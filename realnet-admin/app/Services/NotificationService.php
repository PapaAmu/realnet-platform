<?php

namespace App\Services;

use App\Models\User;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\Project;
use App\Models\Quotation;
use App\Models\Task;
use App\Notifications\InvoiceCreatedNotification;
use App\Notifications\InvoiceOverdueNotification;
use App\Notifications\PaymentReceivedNotification;
use App\Notifications\ProjectStatusChangedNotification;
use App\Notifications\QuotationCreatedNotification;
use App\Notifications\TaskAssignedNotification;
use App\Notifications\TaskDueReminderNotification;
use Illuminate\Support\Facades\Notification;

class NotificationService
{
    /**
     * Get all admin users who should receive notifications
     */
    public static function getAdminUsers()
    {
        // Get all users - you can filter by role if you have roles implemented
        return User::all();
    }

    /**
     * Notify admins about a new invoice
     */
    public static function notifyInvoiceCreated(Invoice $invoice): void
    {
        $users = static::getAdminUsers();
        Notification::send($users, new InvoiceCreatedNotification($invoice));
    }

    /**
     * Notify admins about an overdue invoice
     */
    public static function notifyInvoiceOverdue(Invoice $invoice): void
    {
        $users = static::getAdminUsers();
        Notification::send($users, new InvoiceOverdueNotification($invoice));
    }

    /**
     * Notify admins about a new quotation
     */
    public static function notifyQuotationCreated(Quotation $quotation): void
    {
        $users = static::getAdminUsers();
        Notification::send($users, new QuotationCreatedNotification($quotation));
    }

    /**
     * Notify admins about a payment received
     */
    public static function notifyPaymentReceived(Payment $payment): void
    {
        $users = static::getAdminUsers();
        Notification::send($users, new PaymentReceivedNotification($payment));
    }

    /**
     * Notify the assigned user about a task
     */
    public static function notifyTaskAssigned(Task $task): void
    {
        if ($task->assignedTo) {
            $task->assignedTo->notify(new TaskAssignedNotification($task));
        }
    }

    /**
     * Notify user about task due reminder
     */
    public static function notifyTaskDueReminder(Task $task): void
    {
        if ($task->assignedTo) {
            $task->assignedTo->notify(new TaskDueReminderNotification($task));
        }
    }

    /**
     * Notify project owner and members about status change
     */
    public static function notifyProjectStatusChanged(Project $project, string $oldStatus, string $newStatus): void
    {
        $usersToNotify = collect();

        // Add project owner
        if ($project->owner) {
            $usersToNotify->push($project->owner);
        }

        // Add project members
        foreach ($project->members as $member) {
            if (!$usersToNotify->contains('id', $member->id)) {
                $usersToNotify->push($member);
            }
        }

        Notification::send($usersToNotify, new ProjectStatusChangedNotification($project, $oldStatus, $newStatus));
    }

    /**
     * Create a simple database notification for a user
     */
    public static function createDatabaseNotification(User $user, string $title, string $body, string $url = null, string $icon = 'heroicon-o-bell', string $iconColor = 'primary'): void
    {
        $user->notifications()->create([
            'id' => \Illuminate\Support\Str::uuid(),
            'type' => 'App\\Notifications\\GenericNotification',
            'data' => [
                'title' => $title,
                'body' => $body,
                'url' => $url,
                'icon' => $icon,
                'icon_color' => $iconColor,
            ],
        ]);
    }

    /**
     * Broadcast notification to all admin users
     */
    public static function broadcastToAdmins(string $title, string $body, string $url = null, string $icon = 'heroicon-o-bell', string $iconColor = 'primary'): void
    {
        $users = static::getAdminUsers();
        
        foreach ($users as $user) {
            static::createDatabaseNotification($user, $title, $body, $url, $icon, $iconColor);
        }
    }
}
