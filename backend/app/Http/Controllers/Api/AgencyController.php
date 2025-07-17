<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Agency;
use Illuminate\Http\Request;

class AgencyController extends Controller
{
    public function index()
    {
        return Agency::all();
    }

   public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'name' => 'required|string|max:255',
                'short_name' => 'nullable|string|max:100',
                'classification' => 'required|in:C0,SC,CB,RD,ST,R0',
                'address' => 'nullable|string',
                'head_name' => 'nullable|string|max:255',
                'head_position' => 'nullable|string|max:255',
                'contact_details' => 'nullable|string|max:255',
                'is_active' => 'required|boolean',
                'logo' => 'nullable|file|image|max:2048', // Optional logo validation
            ]);

            if ($request->hasFile('logo')) {
                $path = $request->file('logo')->store('logos', 'public');
                $data['logo_path'] = $path;
            }

            $agency = Agency::create($data);
            return response()->json($agency, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }



    public function show($id)
    {
        return Agency::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $agency = Agency::findOrFail($id);

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'short_name' => 'nullable|string|max:100',
            'classification' => 'required|in:C0,SC,CB,RD,ST,R0',
            'address' => 'nullable|string',
            'head_name' => 'nullable|string|max:255',
            'head_position' => 'nullable|string|max:255',
            'contact_details' => 'nullable|string|max:255',
            'is_active' => 'required|boolean',
        ]);

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('logos', 'public');
            $data['logo_path'] = $path;
        }

        $agency->update($data);
        return response()->json($agency);
    }

    public function destroy($id)
    {
        $agency = Agency::findOrFail($id);
        $agency->delete();
        return response()->json(null, 204);
    }
}
