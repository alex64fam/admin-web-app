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
        Schema::create('gender_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gender_id')->constrained('genders')->onDelete('cascade');
            $table->string('locale')->index();
            $table->string('name');
            $table->timestamps();
            $table->unique(['gender_id', 'locale'], 'gender_id_locale_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gender_translations');
    }
};
