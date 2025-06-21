<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Couple extends Model
{
    protected $fillable = [
        'user_id_1',
        'user_id_2',
        'relationship_status_id'
    ];

    public function userOne(): BelongsTo
    {
        return $this->belongsTo(User::class ,'user_id_1');
    }

    public function userTwo(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id_2');
    }

    public function relationshipStatus(): BelongsTo
    {
        return $this->belongsTo(RelationshipStatus::class);
    }
}
