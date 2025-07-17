// app/Http/Controllers/API/AuditorController.php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Auditor;

class AuditorController extends Controller
{
    public function index()
    {
        return Auditor::with('agency')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'is_external' => 'required|boolean',
            'is_active' => 'required|boolean',
            'last_name' => 'required|string|max:100',
            'first_name' => 'required|string|max:100',
            'middle_name' => 'nullable|string|max:100',
            'suffix' => 'nullable|string|max:50',
            'prefix' => 'nullable|string|max:50',
            'position' => 'nullable|string|max:150',
            'salary' => 'nullable|numeric',
            'agency_id' => 'nullable|exists:agencies,id',
            'expertise' => 'nullable|string',
            'email' => 'required|email|unique:auditors,email',
            'tin' => 'nullable|string|unique:auditors,tin',
            'birthdate' => 'nullable|date',
            'contact_no' => 'nullable|string',
            'status' => 'required|in:0,1,2,3'
        ]);

        $auditor = Auditor::create($request->all());
        return response()->json($auditor, 201);
    }

    public function show($id)
    {
        return Auditor::with('agency')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $auditor = Auditor::findOrFail($id);
        $auditor->update($request->all());
        return response()->json($auditor, 200);
    }

    public function destroy($id)
    {
        $auditor = Auditor::findOrFail($id);
        $auditor->delete();
        return response()->json(null, 204);
    }
}
