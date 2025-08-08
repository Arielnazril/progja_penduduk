<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ContactController extends Controller
{
    public function index()
    {
        $dataContact = Contact::all();
        return response()->json($dataContact);
    }

    public function show($id)
{
    $contact = Contact::find($id);

    if (! $contact) {
        return response()->json([
            'message' => 'Data contact tidak ditemukan.',
        ], 404);
    }

    return response()->json($contact);
}


    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'no_rumah' => 'required|string',
            'status_perkawinan' => 'required|in:Belum Menikah,Menikah,Cerai',
            'pekerjaan' => 'required|string',
            'status_hubungan_dalam_keluarga' => 'required|string',
        ]);

        // Tambahkan user_id agar data terhubung ke user
        $contact = Contact::create($data);

        return response()->json($contact, 201);
    }

    public function update(Request $request, $id)
    {
        $contact = Contact::findOrFail($id);

        $data = $request->validate([
            'name' => 'sometimes|required|string',
            'no_rumah' => 'sometimes|required|string',
            'status_perkawinan' => 'sometimes|required|in:Belum Menikah,Menikah,Cerai',
            'pekerjaan' => 'sometimes|required|string',
            'status_hubungan_dalam_keluarga' => 'sometimes|required|string',
        ]);

        $contact->update($data);

        return response()->json($contact);
    }

public function destroy($id)
{
    try {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return response()->json(['message' => 'Berhasil dihapus'], 200); // ✅ Kirim JSON
    } catch (\Exception $e) {
        return response()->json(['message' => 'Data tidak ditemukan'], 404);
    }
}
}
