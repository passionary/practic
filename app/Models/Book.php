<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'price', 'author_id', 'house_id'
    ];

    public function author()
    {
        return $this->belongsTo('App\Models\Author', 'author_id');
    }

    public function house()
    {
        return $this->belongsTo('App\Models\House', 'house_id');
    }
}
