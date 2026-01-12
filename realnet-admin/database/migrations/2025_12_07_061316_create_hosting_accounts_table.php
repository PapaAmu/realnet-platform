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
        Schema::create('hosting_accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained()->cascadeOnDelete();
            $table->string('domain_name');
            $table->string('service_type');
            $table->string('provider')->nullable();
            $table->string('server_ip')->nullable();
            $table->string('control_panel_url')->nullable();
            $table->string('username')->nullable();
            $table->string('status')->default('active');
            $table->date('activation_date')->nullable();
            $table->date('next_renewal_date')->nullable();
            $table->decimal('price', 10, 2)->default(0.00);
            $table->string('billing_cycle')->default('yearly');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hosting_accounts');
    }
};
