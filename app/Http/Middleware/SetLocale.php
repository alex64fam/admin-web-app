<?php

namespace App\Http\Middleware;

use App\Models\Language;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Obtener los idiomas soportados activamente desde la base de datos,
        // usando caché para mayor eficiencia y evitar consultas repetidas.
        // La caché se recordará "para siempre" hasta que se limpie manualmente (php artisan cache:clear)
        // o si los idiomas cambian y se invalida la caché de alguna forma.
        $supportedLocales = Cache::rememberForever('supported_locales', function () {
            return Language::where('is_active', true)->pluck('code')->toArray();
        });

        // Establece un locale por defecto (el de fallback de tu config/app.php)
        // en caso de que no se pueda determinar uno válido.
        $locale = config('app.fallback_locale');

        // Lógica para determinar el locale:
        // 1. Prioridad: Encabezado 'Accept-Language' (común en APIs)
        if ($request->hasHeader('Accept-Language')) {
            $rawLocale = $request->header('Accept-Language');
            // Toma los dos primeros caracteres (ej. 'es', 'en')
            $requestedLocale = substr($rawLocale, 0, 2);
            if (in_array($requestedLocale, $supportedLocales)) {
                $locale = $requestedLocale;
            }
        }
        // 2. Siguiente prioridad: Parámetro de consulta 'lang' (ej. ?lang=es)
        elseif ($request->query('lang')) {
            $requestedLocale = $request->query('lang');
            if (in_array($requestedLocale, $supportedLocales)) {
                $locale = $requestedLocale;
            }
        }
        // 3. Siguiente prioridad: Sesión (para persistencia en aplicaciones web)
        elseif (Session::has('locale')) {
            $sessionLocale = Session::get('locale');
            if (in_array($sessionLocale, $supportedLocales)) {
                $locale = $sessionLocale;
            }
        }

        // Establece el locale global de la aplicación Laravel para la petición actual
        App::setLocale($locale);

        // Para peticiones web (no AJAX y no que esperen JSON), guarda el locale en la sesión.
        // Esto mantiene el idioma seleccionado para futuras peticiones del mismo usuario web.
        if ($request->isMethod('GET') && ! $request->ajax() && ! $request->wantsJson()) {
            Session::put('locale', $locale);
        }
        return $next($request);
    }
}
