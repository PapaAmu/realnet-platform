<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Add file attachments table
        Schema::create('project_attachments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->onDelete('cascade');
            $table->foreignId('uploaded_by')->constrained('users');
            $table->string('file_name');
            $table->string('file_path');
            $table->string('file_type');
            $table->integer('file_size');
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('task_attachments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_id')->constrained()->onDelete('cascade');
            $table->foreignId('uploaded_by')->constrained('users');
            $table->string('file_name');
            $table->string('file_path');
            $table->string('file_type');
            $table->integer('file_size');
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // Add task dependencies
        Schema::create('task_dependencies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_id')->constrained()->onDelete('cascade');
            $table->foreignId('depends_on_task_id')->constrained('tasks')->onDelete('cascade');
            $table->enum('dependency_type', ['finish_to_start', 'start_to_start', 'finish_to_finish', 'start_to_finish'])->default('finish_to_start');
            $table->timestamps();
            
            $table->unique(['task_id', 'depends_on_task_id']);
        });

        // Add time tracking
        Schema::create('time_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained();
            $table->timestamp('started_at');
            $table->timestamp('ended_at')->nullable();
            $table->integer('duration_minutes')->nullable(); // Calculated when ended
            $table->text('description')->nullable();
            $table->boolean('billable')->default(true);
            $table->timestamps();
        });

        // Add activity logs
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();
            $table->nullableMorphs('subject'); // Can be project or task
            $table->foreignId('user_id')->constrained();
            $table->string('action'); // created, updated, deleted, status_changed, assigned, etc.
            $table->json('properties')->nullable(); // Old and new values
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // Add project templates
        Schema::create('project_templates', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->json('template_data'); // Stores project structure as JSON
            $table->foreignId('created_by')->constrained('users');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Add subtasks
        Schema::create('subtasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->boolean('is_completed')->default(false);
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Add labels/tags for tasks
        Schema::create('task_labels', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('color')->default('#3B82F6');
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('task_label_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_id')->constrained()->onDelete('cascade');
            $table->foreignId('task_label_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            
            $table->unique(['task_id', 'task_label_id']);
        });

        // Add columns to existing tables
        Schema::table('projects', function (Blueprint $table) {
            $table->string('project_code')->nullable()->after('id');
            $table->decimal('actual_budget', 10, 2)->nullable()->after('budget');
            $table->boolean('is_template')->default(false)->after('progress');
            $table->date('completed_at')->nullable()->after('deadline');
            $table->json('custom_fields')->nullable();
        });

        Schema::table('tasks', function (Blueprint $table) {
            $table->foreignId('parent_task_id')->nullable()->constrained('tasks')->onDelete('cascade')->after('project_id');
            $table->date('started_at')->nullable()->after('due_date');
            $table->date('completed_at')->nullable()->after('started_at');
            $table->integer('progress')->default(0)->after('actual_hours');
            $table->boolean('is_milestone')->default(false);
            $table->json('custom_fields')->nullable();
        });

        Schema::table('task_comments', function (Blueprint $table) {
            $table->boolean('is_internal')->default(false)->after('content');
            $table->foreignId('parent_comment_id')->nullable()->constrained('task_comments')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('task_comments', function (Blueprint $table) {
            $table->dropForeign(['parent_comment_id']);
            $table->dropColumn(['is_internal', 'parent_comment_id']);
        });

        Schema::table('tasks', function (Blueprint $table) {
            $table->dropForeign(['parent_task_id']);
            $table->dropColumn(['parent_task_id', 'started_at', 'completed_at', 'progress', 'is_milestone', 'custom_fields']);
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn(['project_code', 'actual_budget', 'is_template', 'completed_at', 'custom_fields']);
        });

        Schema::dropIfExists('task_label_assignments');
        Schema::dropIfExists('task_labels');
        Schema::dropIfExists('subtasks');
        Schema::dropIfExists('project_templates');
        Schema::dropIfExists('activity_logs');
        Schema::dropIfExists('time_logs');
        Schema::dropIfExists('task_dependencies');
        Schema::dropIfExists('task_attachments');
        Schema::dropIfExists('project_attachments');
    }
};
