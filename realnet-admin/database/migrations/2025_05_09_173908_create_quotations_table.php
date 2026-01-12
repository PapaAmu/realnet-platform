<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('quotations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('company')->nullable();
            $table->string('service');
            $table->text('project_description');
            $table->string('budget')->nullable();
            $table->string('timeline')->nullable();
            $table->string('reference')->nullable();
            $table->boolean('agree_to_terms')->default(false);
            $table->text('additional_details')->nullable();
            $table->string('preferred_contact_method')->nullable();
            $table->string('project_type')->nullable();
            $table->string('urgency')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quotations');
    }
};