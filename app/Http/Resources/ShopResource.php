<?php

namespace App\Http\Resources;

use Illuminate\Support\Facades\URL;
use Illuminate\Http\Resources\Json\JsonResource;

class ShopResource extends JsonResource
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
        'user_id' => $this->user_id,
        'image_url' => $this->image ? URL::to($this->image) : null,
        'name' => $this->name,
        'address' => $this->address,
        'latitude' => $this->latitude,
        'longitude' => $this->longitude,
        'hour' => $this->hour,
        'note' => $this->note,
        'slug' => $this->slug,
        'tag' => $this->tag,
        'created_at' => (new \DateTime($this->created_at))->format('Y-m-d H:i:s'),
        'updated_at' => (new \DateTime($this->updated_at))->format('Y-m-d H:i:s'),
       ];
    }
}
