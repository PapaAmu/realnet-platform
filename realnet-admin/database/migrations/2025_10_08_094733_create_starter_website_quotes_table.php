<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_starter_website_quotes_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('starter_website_quotes', function (Blueprint $table) {
            $table->id();
            $table->enum('project_type', ['new', 'redesign', 'fix']);
            $table->string('business_name')->nullable();
            $table->text('description');
            $table->json('attachments')->nullable(); // Store file metadata
            $table->string('contact_full_name');
            $table->string('contact_email');
            $table->string('contact_phone');
            $table->string('status')->default('new');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('starter_website_quotes');
    }
};