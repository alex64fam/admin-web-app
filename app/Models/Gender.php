<?php

namespace App\Models;

use App\HasTranslations;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\App;

class Gender extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'key',
        'is_active',
        'description',
    ];

    protected $appends = ['name'];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    protected function getTranslationModel(): string
    {
        return GenderTranslation::class;
    }

    public function getNameAttribute(): ?string
    {
        return $this->getTranslated('name');
    }
}
