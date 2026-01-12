<?php

namespace App\Console\Commands;

use App\Models\Task;
use App\Services\NotificationService;
use Illuminate\Console\Command;

class SendTaskDueReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notifications:task-reminders {--overdue : Include overdue tasks}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send reminders for tasks that are due soon or overdue';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Checking for tasks due soon...');

        // Get tasks due within the next 24 hours that are not completed
        $tasksDueSoon = Task::where('status', '!=', 'completed')
            ->whereNotNull('due_date')
            ->whereDate('due_date', '<=', now()->addDay())
            ->whereDate('due_date', '>=', now())
            ->whereNotNull('assigned_to')
            ->get();

        foreach ($tasksDueSoon as $task) {
            NotificationService::notifyTaskDueReminder($task);
            $this->line("Reminder sent for task: {$task->title}");
        }

        $this->info("Sent {$tasksDueSoon->count()} due-soon reminders.");

        // If --overdue flag is passed, also send overdue reminders
        if ($this->option('overdue')) {
            $this->info('Checking for overdue tasks...');

            $overdueTasks = Task::where('status', '!=', 'completed')
                ->whereNotNull('due_date')
                ->whereDate('due_date', '<', now())
                ->whereNotNull('assigned_to')
                ->get();

            foreach ($overdueTasks as $task) {
                NotificationService::notifyTaskDueReminder($task);
                $this->line("Overdue reminder sent for task: {$task->title}");
            }

            $this->info("Sent {$overdueTasks->count()} overdue reminders.");
        }

        return self::SUCCESS;
    }
}
