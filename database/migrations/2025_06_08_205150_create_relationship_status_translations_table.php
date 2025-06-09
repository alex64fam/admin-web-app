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
        Schema::create('relationship_status_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('relationship_status_id')->constrained('relationship_statuses')->onDelete('cascade');
            $table->string('locale')->index();
            $table->string('name');
            $table->timestamps();
            $table->unique(['relationship_status_id', 'locale'], 'rs_id_locale_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('relationship_status_translations');
    }
};
