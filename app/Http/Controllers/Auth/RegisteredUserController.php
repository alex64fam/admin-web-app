<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Response as HttpResponse; // Usa el alias HttpResponse

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            // 'gender_id' => \App\Models\Gender::where('key', 'male')->first()->id,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole('basic');

        event(new Registered($user));

        Auth::login($user);

        return to_route('dashboard');
    }

    /**
     * Handle an incoming registration request for API.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function storeApi(Request $request): HttpResponse // Usa el alias HttpResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole('basic');

        event(new Registered($user));

        // Crea un token para el usuario recién registrado
        $token = $user->createToken($request->deviceName ?? 'default_device')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token,
        ], 201); // 201 Created
    }
}
