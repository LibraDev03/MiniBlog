<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    use HasFactory;

    protected $table = 'posts';

    protected $fillable = ['title', 'content', 'user_id'];

    public function U() {
        return $this->belongsTo(User::class);
    }

    public function C()
    {
        return $this->hasMany(Comment::class);
    }

}
