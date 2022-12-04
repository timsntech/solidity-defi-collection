<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AddressResource extends JsonResource
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
            'type' => 'addresses',
            'id' => (string) $this->uuid,
            'attributes' => [
                'address' => $this->address,
                'nonce' => $this->nonce,
                'logged_in' => (bool) $this->logged_in,
                'name' => $this->name,
                'email' => $this->email,
                'email_verified_at' => ($this->email_verified_at ? $this->email_verified_at->toIso8601String() : null),
                'created_at' => $this->created_at->toIso8601String(),
                'updated_at' => $this->updated_at->toIso8601String(),
            ],
        ];
    }
}
