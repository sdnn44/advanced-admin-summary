<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'img' => $this->img,
            'status' => $this->status,
            'steam_url' => $this->steam_url,
            'csarchive_url' => $this->csarchive_url,
            'strefaskilla_url' => $this->strefaskilla_url,
            'tsarvar_url' => $this->tsarvar_url,
        ];
    }
}
