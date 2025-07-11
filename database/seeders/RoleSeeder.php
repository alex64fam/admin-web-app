<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Roles de sistema
        $role = Role::create(['name' => 'root']);
        $role->givePermissionTo(['admin.view']);
        $role->givePermissionTo(['couple.view', 'couple.create', 'couple.edit', 'couple.delete']);
        $role->givePermissionTo(['pet.view', 'pet.create', 'pet.edit', 'pet.delete']);
        $role->givePermissionTo(['product.view', 'product.create', 'product.edit', 'product.delete']);
        $role->givePermissionTo(['clothing.view', 'clothing.create', 'clothing.edit', 'clothing.delete']);
        $role->givePermissionTo(['user.view', 'user.create', 'user.edit', 'user.delete']);
        $role->givePermissionTo(['role.view', 'role.create', 'role.edit', 'role.delete']);
        $role->givePermissionTo(['permission.view', 'permission.create', 'permission.edit', 'permission.delete']);
        $role->givePermissionTo(['language.view', 'language.create', 'language.edit', 'language.delete']);
        $role->givePermissionTo(['gender.view', 'gender.create', 'gender.edit', 'gender.delete']);
        Role::create(['name' => 'admin']);
        // Roles de aplicación
        Role::create(['name' => 'basic']);
        Role::create(['name' => 'subscription']);
        Role::create(['name' => 'premium']);
        Role::create(['name' => 'vip']);
    }
}
