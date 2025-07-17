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
        Schema::table('auditors', function (Blueprint $table) {
            $table->boolean('is_external');
            $table->boolean('is_active');
            $table->string('last_name', 100);
            $table->string('first_name', 100);
            $table->string('middle_name', 100)->nullable();
            $table->string('suffix', 50)->nullable();
            $table->string('prefix', 50)->nullable();
            $table->string('position', 150)->nullable();
            $table->decimal('salary', 12, 2)->nullable();
            $table->foreignId('agency_id')->nullable()->constrained('agencies')->onDelete('cascade');
            $table->text('expertise')->nullable();
            $table->string('email')->unique();
            $table->string('tin')->unique()->nullable();
            $table->date('birthdate')->nullable();
            $table->string('contact_no')->nullable();
            $table->tinyInteger('status'); // 0, 1, 2, 3
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('auditors', function (Blueprint $table) {
            $table->dropColumn([
                'is_external', 'is_active', 'last_name', 'first_name', 'middle_name',
                'suffix', 'prefix', 'position', 'salary', 'agency_id', 'expertise',
                'email', 'tin', 'birthdate', 'contact_no', 'status'
            ]);
        });
    }

};
