<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('custom_website_quotes', function (Blueprint $table) {
            $table->id();
            $table->string('project_type');
            $table->string('business_name')->nullable();
            $table->string('industry')->nullable();
            $table->string('timeline')->nullable();
            $table->string('budget_range')->nullable();
            $table->json('features')->nullable();
            $table->text('technical_requirements')->nullable();
            $table->text('description')->nullable();
            $table->json('attachments')->nullable();
            
            // Contact Info
            $table->string('contact_full_name');
            $table->string('contact_email');
            $table->string('contact_phone');
            $table->string('contact_company_role')->nullable();
            
            $table->enum('status', ['new', 'contacted', 'quoted', 'accepted', 'rejected'])->default('new');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('custom_website_quotes');
    }
};
