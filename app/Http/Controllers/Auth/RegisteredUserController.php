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
            'username' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'language_id' => 'nullable|integer|exists:languages,id',
            'gender_id' => 'required|integer|exists:genders,id',
        ], [
            'name.required' => 'El campo nombre es obligatorio',
            'name.string' => 'El nombre debe ser texto',
            'name.max' => 'El nombre no puede tener más de 255 caracteres',
            'username.required' => 'El campo nombre de usuario es obligatorio',
            'username.string' => 'El nombre de usuario debe ser texto',
            'username.max' => 'El nombre de usuario no puede tener más de 255 caracteres',
            'email.required' => 'El campo correo electrónico es obligatorio',
            'email.string' => 'El correo electrónico debe ser texto',
            'email.email' => 'El correo electrónico debe ser una dirección válida',
            'email.max' => 'El correo electrónico no puede tener más de 255 caracteres',
            'email.unique' => 'Este correo electrónico ya está registrado',
            'password.required' => 'La contraseña es obligatoria',
            'password.confirmed' => 'Las contraseñas no coinciden',
            'language_id.integer' => 'El idioma debe ser un número entero',
            'language_id.exists' => 'El idioma seleccionado no es válido',
            'gender_id.required' => 'El género es obligatorio',
            'gender_id.integer' => 'El género debe ser un número entero',
            'gender_id.exists' => 'El género seleccionado no es válido',
        ]);

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'gender_id' => $request->gender_id,
            'language_id' => $request->language_id ?? \App\Models\Language::first()->id, // Si language_id es nulo, usa el primer idioma de la base de datos
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
            'username' => $request->username,
            'email' => $request->email,
            'gender_id' => $request->gender_id,
            'language_id' => $request->language_id ?? \App\Models\Language::first()->id, // Si language_id es nulo, usa el primer idioma de la base de datos
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ], [
            'name.required' => 'El campo nombre es obligatorio',
            'name.string' => 'El nombre debe ser texto',
            'name.max' => 'El nombre no puede tener más de 255 caracteres',
            'username.required' => 'El campo nombre de usuario es obligatorio',
            'username.string' => 'El nombre de usuario debe ser texto',
            'username.max' => 'El nombre de usuario no puede tener más de 255 caracteres',
            'email.required' => 'El campo correo electrónico es obligatorio',
            'email.string' => 'El correo electrónico debe ser texto',
            'email.email' => 'El correo electrónico debe ser una dirección válida',
            'email.max' => 'El correo electrónico no puede tener más de 255 caracteres',
            'email.unique' => 'Este correo electrónico ya está registrado',
            'password.required' => 'La contraseña es obligatoria',
            'password.confirmed' => 'Las contraseñas no coinciden',
            'language_id.integer' => 'El idioma debe ser un número entero',
            'language_id.exists' => 'El idioma seleccionado no es válido',
            'gender_id.required' => 'El género es obligatorio',
            'gender_id.integer' => 'El género debe ser un número entero',
            'gender_id.exists' => 'El género seleccionado no es válido',
        ]);

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'gender_id' => $request->gender_id,
            'language_id' => $request->language_id ?? \App\Models\Language::first()->id, // Si language_id es nulo, usa el primer idioma de la base de datos
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
