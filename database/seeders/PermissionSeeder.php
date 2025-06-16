<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin user permissions
        Permission::create(['name' => 'admin.view']);
        // Couple permissions
        Permission::create(['name' => 'couple.view']);
        Permission::create(['name' => 'couple.create']);
        Permission::create(['name' => 'couple.edit']);
        Permission::create(['name' => 'couple.delete']);
        // Pet permissions
        Permission::create(['name' => 'pet.view']);
        Permission::create(['name' => 'pet.create']);
        Permission::create(['name' => 'pet.edit']);
        Permission::create(['name' => 'pet.delete']);
        // Products permissions
        Permission::create(['name' => 'product.view']);
        Permission::create(['name' => 'product.create']);
        Permission::create(['name' => 'product.edit']);
        Permission::create(['name' => 'product.delete']);
        // Clothing permissions
        Permission::create(['name' => 'clothing.view']);
        Permission::create(['name' => 'clothing.create']);
        Permission::create(['name' => 'clothing.edit']);
        Permission::create(['name' => 'clothing.delete']);
        // User permissions
        Permission::create(['name' => 'user.view']);
        Permission::create(['name' => 'user.create']);
        Permission::create(['name' => 'user.edit']);
        Permission::create(['name' => 'user.delete']);
        // Gender permissions
        Permission::create(['name' => 'gender.view']);
        Permission::create(['name' => 'gender.create']);
        Permission::create(['name' => 'gender.edit']);
        Permission::create(['name' => 'gender.delete']);
        // Role permissions
        Permission::create(['name' => 'role.view']);
        Permission::create(['name' => 'role.create']);
        Permission::create(['name' => 'role.edit']);
        Permission::create(['name' => 'role.delete']);
        // Permission permissions
        Permission::create(['name' => 'permission.view']);
        Permission::create(['name' => 'permission.create']);
        Permission::create(['name' => 'permission.edit']);
        Permission::create(['name' => 'permission.delete']);
        // Language permissions
        Permission::create(['name' => 'language.view']);
        Permission::create(['name' => 'language.create']);
        Permission::create(['name' => 'language.edit']);
        Permission::create(['name' => 'language.delete']);
    }
}
