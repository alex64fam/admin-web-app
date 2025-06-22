<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\App;

class RelationshipStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'is_active',
        'description',
    ];

    public function translation(): HasMany
    {
        return $this->hasMany(RelationshipStatusTranslation::class);
    }

    public function getNameAttribute(): ?string
    {
        $currentLocale = App::getLocale();
        $fallbackLocale = config('app.fallback_locale');
        $translations = $this->translations; // Carga las traducciones una sola vez
        // 1. Intentar obtener la traducción para el idioma actual
        $translation = $translations->firstWhere('locale', $currentLocale);
        // 2. Si no se encuentra, intentar obtener la traducción para el idioma de fallback
        if (!$translation && $currentLocale !== $fallbackLocale) {
            $translation = $translations->firstWhere('locale', $fallbackLocale);
        }
        // 3. Si aún no se encuentra, intentar obtener la primera traducción disponible
        //    Esto asegura que siempre se muestre algo si hay *alguna* traducción,
        //    sin importar el idioma.
        if (!$translation) {
            $translation = $translations->first(); // Toma la primera traducción que encuentre
        }
        // 4. Si después de todo no hay ninguna traducción, usar la 'key' o un mensaje predeterminado
        return $translation ? $translation->name : ($this->key ?? '[No Translation]');
    }
}
