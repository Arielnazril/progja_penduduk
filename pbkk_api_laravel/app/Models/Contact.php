<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Contact extends Model
{
    use HasFactory, HasUlids;
    protected $table = 'contacts';

    protected $fillable = [
        'id',
        'name',
        'no_rumah',
        'status_perkawinan',
        'pekerjaan',
        'status_hubungan_dalam_keluarga',
    ];

    protected function casts(): array
    {
        return [
            'id' => 'string',
        ];
    }
}
