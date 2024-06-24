<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'log',
        'status',
    ];

    public function userData()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    protected $attributes = [
        'status' => 'Pending',
    ];
}
