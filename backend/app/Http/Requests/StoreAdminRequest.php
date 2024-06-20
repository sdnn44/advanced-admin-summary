<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAdminRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:20|unique,admins,name',
            'img' => 'required|string',
            'status' => 'required|string|max:20',
            'steam_url' => 'required|string|unique,admins,steam_url',
            'csarchive_url' => 'required|string|unique,admins,csarchive_url',
            'strefaskilla_url' => 'required|string|unique,admins,strefaskilla_url',
        ];
    }
}
