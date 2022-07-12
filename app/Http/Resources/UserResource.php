<?php

namespace App\Http\Resources;

use Illuminate\Support\Facades\URL;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'profile_image' => $this->profile_image,
            'profile_image_url' => $this->profile_image ? URL::to($this->profile_image) : null,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'is_admin' => $this->is_admin,
            // 'token' => $request->bearerToken(),
        ];
    }
}
