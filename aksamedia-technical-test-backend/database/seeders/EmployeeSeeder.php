<?php
// database/seeders/EmployeeSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Employee;
use App\Models\Division;

class EmployeeSeeder extends Seeder
{
    public function run()
    {
        $divisions = Division::all();
        
        $employees = [
            [
                'name' => 'John Doe',
                'phone' => '08111111111',
                'position' => 'Senior Developer',
                'division' => 'Backend'
            ],
            [
                'name' => 'Jane Smith',
                'phone' => '08222222222',
                'position' => 'Frontend Developer',
                'division' => 'Frontend'
            ],
            [
                'name' => 'Mike Johnson',
                'phone' => '08333333333',
                'position' => 'Mobile Developer',
                'division' => 'Mobile Apps'
            ],
            [
                'name' => 'Sarah Wilson',
                'phone' => '08444444444',
                'position' => 'QA Engineer',
                'division' => 'QA'
            ],
            [
                'name' => 'David Brown',
                'phone' => '08555555555',
                'position' => 'Full Stack Developer',
                'division' => 'Full Stack'
            ],
            [
                'name' => 'Emily Davis',
                'phone' => '08666666666',
                'position' => 'UI/UX Designer',
                'division' => 'UI/UX Designer'
            ]
        ];

        foreach ($employees as $employeeData) {
            $division = $divisions->where('name', $employeeData['division'])->first();
            
            if ($division) {
                Employee::create([
                    'name' => $employeeData['name'],
                    'phone' => $employeeData['phone'],
                    'position' => $employeeData['position'],
                    'division_id' => $division->id,
                ]);
            }
        }
    }
}