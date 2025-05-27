<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Response as HttpResponse;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Handle an incoming authentication request for API (login).
     */
    public function storeApi(LoginRequest $request): HttpResponse // Usa el alias HttpResponse
    {
        $request->authenticate();

        $user = $request->user();
        // Genera un token para el usuario
        $token = $user->createToken($request->deviceName ?? 'default_device')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token,
        ], 200);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    /**
     * Destroy an authenticated session for API (logout).
     */
    public function destroyApi(Request $request): HttpResponse // Usa el alias HttpResponse
    {
        // Revoca el token actual que se usó para esta solicitud
        $request->user()->currentAccessToken()->delete();

        // Opcional: También puedes cerrar la sesión web si el cliente también tiene una sesión de navegador
        // Auth::guard('web')->logout();
        // $request->session()->invalidate();
        // $request->session()->regenerateToken();

        return response()->noContent(); // 204 No Content
    }
}
