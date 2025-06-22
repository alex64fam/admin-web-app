<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ConnectionCode extends Model
{
    protected $fillable = [
        'code',
        'user_id',
    ];
    
    // Debe devolver de la fecha de creacion solamente 15 minutos de diferencia
    public function codeActives(String $code)
    {
        return $this->where('code', $code)->where('created_at', '>=', now()->subMinutes(15));
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
