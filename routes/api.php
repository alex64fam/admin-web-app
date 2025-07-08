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
        Route::get('/user', fn (Request $request) => $request->user()->load('language', 'gender'));
        // ... más rutas para Flutter
        Route::prefix('couple')->group(function () {
            Route::get('/verifyCouple', [CoupleController::class, 'verifyCouple']);
            Route::post('/syncCouple', [CoupleController::class, 'syncCouple']);
            Route::post('/generateCode', [CoupleController::class, 'generateCode']);
            Route::post('/unSyncCouple', [CoupleController::class, 'unSyncCouple']);
        });
    });
});
