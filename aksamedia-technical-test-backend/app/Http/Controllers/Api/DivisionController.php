<?php
// app/Http/Controllers/Api/DivisionController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\GetDivisionsRequest;
use App\Models\Division;

class DivisionController extends Controller
{
    public function index(GetDivisionsRequest $request)
    {
        $query = Division::query();
        
        // Filter by name if provided
        if ($request->has('name') && $request->name) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }
        
        $divisions = $query->paginate(10);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Data divisi berhasil diambil',
            'data' => [
                'divisions' => $divisions->items()
            ],
            'pagination' => [
                'current_page' => $divisions->currentPage(),
                'per_page' => $divisions->perPage(),
                'total' => $divisions->total(),
                'last_page' => $divisions->lastPage(),
                'from' => $divisions->firstItem(),
                'to' => $divisions->lastItem(),
            ]
        ]);
    }
}