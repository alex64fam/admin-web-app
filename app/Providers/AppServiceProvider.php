<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'auth.user' => function () {
                if (Auth::check()) {
                    $user = Auth::user();
                    $user->load('roles.permissions');
                    return [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        //'roles' => $user->getRoleNames(),
                        'permissions' => $user->getAllPermissions()->pluck('name'),
                    ];
                }
                return null;
            }
        ]);
    }
}
