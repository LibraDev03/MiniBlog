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

    public function c()
    {
        return $this->hasMany(Comment::class, 'post_id')
                    ->whereNull('parent_id') // Chỉ lấy bình luận gốc
                    ->with(['replies.user', 'user']) // Lấy replies và thông tin user
                    ->orderBy('created_at', 'asc'); // Sắp xếp theo thời gian
    }

}
