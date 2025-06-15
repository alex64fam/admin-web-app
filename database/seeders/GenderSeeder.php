<?php

namespace Database\Seeders;

use App\Models\Gender;
use App\Models\GenderTranslation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GenderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $male = Gender::create(['key' => 'male', 'description' => 'Male']);
        $female = Gender::create(['key' =>'female', 'description' => 'Female']);
        $other = Gender::create(['key' =>'other', 'description' => 'Other']);

        GenderTranslation::create(['gender_id' => $male->id, 'locale' => 'en', 'name' => 'Male']);
        GenderTranslation::create(['gender_id' => $male->id, 'locale' => 'es', 'name' => 'Hombre']);

        GenderTranslation::create(['gender_id' => $female->id, 'locale' => 'en', 'name' => 'Female']);
        GenderTranslation::create(['gender_id' => $female->id, 'locale' => 'es', 'name' => 'Mujer']);

        GenderTranslation::create(['gender_id' => $other->id, 'locale' => 'en', 'name' => 'Other']);
        GenderTranslation::create(['gender_id' => $other->id, 'locale' => 'es', 'name' => 'Otro']);
    }
}
