<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GenderTranslation extends Model
{
    use HasFactory;

    protected $fillable = ['gender_id', 'locale', 'name'];

    public function gender(): BelongsTo
    {
        return $this->belongsTo(Gender::class);
    }
}
