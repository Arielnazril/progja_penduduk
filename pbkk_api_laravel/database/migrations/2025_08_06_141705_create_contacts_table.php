<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->ulid('id')->primary(); // ULID string

            // ✅ Penambahan baris penting: relasi ke tabel users
            // Informasi dasar
            $table->string('name'); // Nama lengkap
            $table->string('no_rumah')->nullable(); // Nomor rumah

            // Status perkawinan
            $table->enum('status_perkawinan', ['Belum Menikah', 'Menikah', 'Cerai'])->nullable();

            // Pekerjaan
            $table->string('pekerjaan')->nullable();

            // Status hubungan dalam keluarga
            $table->string('status_hubungan_dalam_keluarga')->nullable(); // Contoh: Kepala Keluarga, Anak, Istri

            // Timestamp
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
