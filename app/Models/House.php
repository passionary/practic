<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class House extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public function books()
    {
        return $this->hasMany('App\Book', 'house_id');
    }
}
