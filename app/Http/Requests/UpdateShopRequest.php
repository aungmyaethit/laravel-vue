<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateShopRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $shop = $this->route('shop');
        if($this->user()->id !== $shop->user_id){
            return false;
        }
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'user_id' => 'exists:users,id',
            'name' => 'required|string|max:1000',
            'image' => 'nullable|string',
            'address' => 'required|string',
            'hour' => 'required|string',
            'latitude' => 'required',
            'longitude' => 'required',
            'note' => 'nullable|string',
            'tag' => 'nullable|string',
        ];
    }
}
