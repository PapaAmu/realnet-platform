<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('quotations', function (Blueprint $table) {
            // Make legacy fields nullable
            $table->string('service')->nullable()->change();
            $table->text('project_description')->nullable()->change();
            $table->string('budget')->nullable()->change();
            $table->string('timeline')->nullable()->change();
            $table->boolean('agree_to_terms')->default(false)->change();
            
            // Add banking details
            $table->text('banking_details')->nullable()->after('terms');
        });
    }

    public function down()
    {
        Schema::table('quotations', function (Blueprint $table) {
            $table->dropColumn('banking_details');
            // Reverting nullable changes is tricky without knowing exact original state, 
            // but usually we don't need to revert "making things nullable" strictly.
        });
    }
};
