<?php
// database/migrations/2024_01_01_000003_create_ecommerce_website_quotes_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('ecommerce_website_quotes', function (Blueprint $table) {
            $table->id();
            $table->enum('project_type', ['new', 'redesign', 'improve']);
            $table->string('business_name')->nullable();
            $table->enum('products_count', ['1-50', '51-100', '101-200', '200+']);
            $table->text('description');
            $table->json('attachments')->nullable();
            $table->string('contact_full_name');
            $table->string('contact_email');
            $table->string('contact_phone');
            $table->enum('status', ['new', 'contacted', 'quoted', 'accepted', 'rejected'])->default('new');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('ecommerce_website_quotes');
    }
};