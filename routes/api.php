<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CoupleController;
use App\Http\Controllers\Api\GenderController;
use App\Http\Controllers\Api\LanguageController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // Autenticación
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [RegisteredUserController::class, 'storeApi']);
    // Catálogos públicos
    Route::get('/genders', [GenderController::class, 'index']);
    Route::get('/languages', [LanguageController::class, 'index']);

    
    // Rutas protegidas
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/users', fn (Request $request) => $request->user());
        // ... más rutas para Flutter
        Route::prefix('couple')->name('couple.')->group(function () {
            Route::post('/sync', [CoupleController::class, 'sync']);
        });
    });
});