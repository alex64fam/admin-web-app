<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Roles de sistema
        Role::create(['role' => 'root', 'description' => 'Usuario Root de todo el sistema']);
        Role::create(['role' => 'admin', 'description' => 'Usuario Administrador de la aplicación']);
        // Roles de aplicación
        Role::create(['role' => 'basic', 'description' => 'Usuario base de la aplicación']);
        Role::create(['role' => 'subscription', 'description' => 'Usuario con suscripción de la aplicación']);
        Role::create(['role' => 'premium', 'description' => 'Usuario premium de la aplicación']);
        Role::create(['role' => 'vip', 'description' => 'Usuario vip de la aplicación']);
    }
}
