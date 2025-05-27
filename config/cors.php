<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Solo rutas API
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost', // Dominios de Flutter en desarrollo
        'https://tu-app-flutter.com' // Dominio en producción
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false, // Importante: FALSE para API pura
];
