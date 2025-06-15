<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RelationshipStatusTranslation extends Model
{
    use HasFactory;

    protected $fillable = ['relationship_status_id', 'locate', 'name'];

    public function relationshipStatus(): BelongsTo
    {
        return $this->belongsTo(RelationshipStatus::class);
    }
}
