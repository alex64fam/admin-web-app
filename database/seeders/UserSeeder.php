<?php

namespace Database\Seeders;

use App\Models\Gender;
use App\Models\Language;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'Alexis Yadir',
            'last_name' => 'Alvarado Sanabria',
            'username' => 'alex64fam',
            'email' => 'alex64fam@hotmail.com',
            'phone' => '2299017587',
            'address' => 'José Hernandez Sierra',
            'city' => 'Boca del Río',
            'state' => 'Veracruz',
            'country' => 'México',
            'zip' => '94298',
            'birthdate' => Carbon::parse('1997-01-16'),
            'latitude' => '19.126815766997282',
            'longitude' => '-96.11418787451517',
            'language_id' => Language::first()->id,
            'gender_id' => Gender::where('key', 'male')->first()->id,
            'is_active' => true,
            'description' => 'Desarrollador de la aplicación.',
            'password' => bcrypt('Mitziwashere97'),
        ]);

        $user->assignRole(['root']);
    }
}
