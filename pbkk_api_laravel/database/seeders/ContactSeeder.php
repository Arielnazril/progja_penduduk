<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Contact;

class ContactSeeder extends Seeder
{
    public function run(): void
    {
        Contact::create([
            'name' => 'Budi Santoso',
            'no_rumah' => 'A12',
            'status_perkawinan' => 'Menikah',
            'pekerjaan' => 'Petani',
            'status_hubungan_dalam_keluarga' => 'Kepala Keluarga',
        ]);
    }
}
