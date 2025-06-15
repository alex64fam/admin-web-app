<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\App;

trait HasTranslations
{
    protected abstract function getTranslationModel(): string;

    public function translations(): HasMany
    {
        return $this->hasMany($this->getTranslationModel());
    }

    public function getTranslated(string $field): ?string
    {
        if (!$this->relationLoaded('translations')) {
            $this->load('translations');
        }
        $translations = $this->translations;

        $currentLocale = App::getLocale();
        $fallbackLocale = config('app.fallback_locale');

        $translation = $translations->firstWhere('locale', $currentLocale);

        if (!$translation && $currentLocale !== $fallbackLocale) {
            $translation = $translations->firstWhere('locale', $fallbackLocale);
        }

        if (!$translation) {
            $translation = $translations->first(); // Toma la primera traducción disponible
        }

        // Si se encontró una traducción y el campo existe en ella, devuélvelo.
        if ($translation && isset($translation->{$field})) {
            return $translation->{$field};
        }

        // Si el campo es 'name' y no se encontró ninguna traducción, usa la 'key' del modelo base.
        if ($field === 'name') {
            return $this->key ?? '[No Translation]';
        }

        // Para otros campos o si no hay traducción/key, devuelve null.
        return null;
    }
}
