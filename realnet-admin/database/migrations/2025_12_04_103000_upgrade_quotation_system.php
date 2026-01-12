<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // 1. Update Quotations Table
        Schema::table('quotations', function (Blueprint $table) {
            $table->foreignId('client_id')->nullable()->after('id')->constrained()->nullOnDelete();
            $table->string('quotation_number')->nullable()->after('id')->unique();
            $table->date('issue_date')->nullable()->after('quotation_number');
            $table->date('expiry_date')->nullable()->after('issue_date');
            $table->enum('status', ['draft', 'sent', 'accepted', 'rejected', 'invoiced'])->default('draft')->after('email');
            $table->decimal('subtotal', 10, 2)->default(0)->after('budget');
            $table->decimal('tax_rate', 5, 2)->default(0)->after('subtotal');
            $table->decimal('tax_amount', 10, 2)->default(0)->after('tax_rate');
            $table->decimal('total_amount', 10, 2)->default(0)->after('tax_amount');
            $table->text('notes')->nullable()->after('additional_details');
            $table->text('terms')->nullable()->after('notes');
        });

        // 2. Create Quotation Items Table
        Schema::create('quotation_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quotation_id')->constrained()->onDelete('cascade');
            $table->text('description');
            $table->integer('quantity')->default(1);
            $table->decimal('unit_price', 10, 2)->default(0);
            $table->decimal('amount', 10, 2)->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('quotation_items');

        Schema::table('quotations', function (Blueprint $table) {
            $table->dropForeign(['client_id']);
            $table->dropColumn([
                'client_id',
                'quotation_number',
                'issue_date',
                'expiry_date',
                'status',
                'subtotal',
                'tax_rate',
                'tax_amount',
                'total_amount',
                'notes',
                'terms'
            ]);
        });
    }
};
