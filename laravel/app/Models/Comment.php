<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['post_id', 'user_id', 'content', 'parent_id'];

    public function post()
    {
        return $this->belongsTo(Posts::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Một bình luận có thể có nhiều phản hồi (replies)
     */
    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id')
        ->with('user') // Lấy thông tin user của replies
        ->orderBy('created_at', 'asc'); // Sắp xếp theo thời gian
    }

    /**
     * Một bình luận có thể có một bình luận cha
     */
    public function parent()
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }
}
