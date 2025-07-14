<?php
// app/Http/Controllers/Api/EmployeeController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateEmployeeRequest;
use App\Http\Requests\GetEmployeesRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Models\Employee;
use Illuminate\Support\Facades\Storage;

class EmployeeController extends Controller
{
    public function index(GetEmployeesRequest $request)
    {
        $query = Employee::with('division');
        
        // Filter by name if provided
        if ($request->has('name') && $request->name) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }
        
        // Filter by division if provided
        if ($request->has('division_id') && $request->division_id) {
            $query->where('division_id', $request->division_id);
        }
        
        $employees = $query->paginate(10);
        
        $employeeData = $employees->items();
        $formattedEmployees = collect($employeeData)->map(function ($employee) {
            return [
                'id' => $employee->id,
                'image' => $employee->image ? asset('storage/' . $employee->image) : null,
                'name' => $employee->name,
                'phone' => $employee->phone,
                'division' => [
                    'id' => $employee->division->id,
                    'name' => $employee->division->name,
                ],
                'position' => $employee->position,
            ];
        });
        
        return response()->json([
            'status' => 'success',
            'message' => 'Data karyawan berhasil diambil',
            'data' => [
                'employees' => $formattedEmployees
            ],
            'pagination' => [
                'current_page' => $employees->currentPage(),
                'per_page' => $employees->perPage(),
                'total' => $employees->total(),
                'last_page' => $employees->lastPage(),
                'from' => $employees->firstItem(),
                'to' => $employees->lastItem(),
            ]
        ]);
    }
    
    public function store(CreateEmployeeRequest $request)
    {
        $validated = $request->validated();
        
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('employees', 'public');
        }
        
        $employee = Employee::create([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'division_id' => $validated['division'],
            'position' => $validated['position'],
            'image' => $imagePath,
        ]);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Karyawan berhasil ditambahkan',
        ], 201);
    }
    
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        $validated = $request->validated();
        
        $imagePath = $employee->image;
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($employee->image) {
                Storage::disk('public')->delete($employee->image);
            }
            
            $imagePath = $request->file('image')->store('employees', 'public');
        }
        
        $employee->update([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'division_id' => $validated['division'],
            'position' => $validated['position'],
            'image' => $imagePath,
        ]);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Karyawan berhasil diperbarui',
        ]);
    }
    
    public function destroy(Employee $employee)
    {
        // Delete image if exists
        if ($employee->image) {
            Storage::disk('public')->delete($employee->image);
        }
        
        $employee->delete();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Karyawan berhasil dihapus',
        ]);
    }
}