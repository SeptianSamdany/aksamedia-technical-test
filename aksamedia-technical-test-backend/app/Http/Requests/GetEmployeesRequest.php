<?php
// app/Http/Requests/GetEmployeesRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetEmployeesRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'nullable|string|max:255',
            'division_id' => 'nullable|uuid|exists:divisions,id',
        ];
    }
}