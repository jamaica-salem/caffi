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
        Schema::table('agencies', function (Blueprint $table) {
            $table->string('name');
            $table->string('short_name', 100)->nullable();
            $table->enum('classification', ['C0', 'SC', 'CB', 'RD', 'ST', 'R0']);
            $table->string('address')->nullable();
            $table->string('head_name')->nullable();
            $table->string('head_position')->nullable();
            $table->string('contact_details')->nullable();
            $table->boolean('is_active')->default(true);
            $table->string('logo_path')->nullable();    
        });
    }

    public function down()
    {
        Schema::table('agencies', function (Blueprint $table) {
            $table->dropColumn([
                'name',
                'short_name',
                'classification',
                'address',
                'head_name',
                'head_position',
                'contact_details',
                'is_active',
                'logo_path',
            ]);
        });
    }

};
