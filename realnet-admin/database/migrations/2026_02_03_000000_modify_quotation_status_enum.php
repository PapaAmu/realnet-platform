<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('quotations', function (Blueprint $table) {
            // We use raw SQL to modify the ENUM to include 'pending'
            // and set default to 'pending'
            DB::statement("ALTER TABLE quotations MODIFY COLUMN status ENUM('draft', 'pending', 'sent', 'accepted', 'rejected', 'invoiced') DEFAULT 'pending'");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('quotations', function (Blueprint $table) {
            DB::statement("ALTER TABLE quotations MODIFY COLUMN status ENUM('draft', 'sent', 'accepted', 'rejected', 'invoiced') DEFAULT 'draft'");
        });
    }
};
