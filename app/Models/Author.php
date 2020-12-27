<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'contact', 'email'
    ];

    public function books()
    {
        return $this->hasMany('App\Book', 'author_id');
    }
}
