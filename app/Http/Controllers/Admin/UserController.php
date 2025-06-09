<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('gender.translations')->get();
        return Inertia::render('admin/users/index', ['users' => $users]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return Inertia::location(route('admin.users.index', [
            'alert' => [
                'type' => 'success',
                'message' => "Usuario $user->name eliminado con éxito.",
                'title' => 'Usuario eliminado.',
                'icon' => 'check-circle-2',
                'color' => 'green',
                'iconColor' => 'white',
                'position' => 'top-right',
                'duration' => '5000',
                'closeOnClick' => 'true',
                'pauseOnHover' => 'true',
            ]
        ]));
    }
}
