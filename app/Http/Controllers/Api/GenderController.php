<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Gender;
use Illuminate\Http\Request;

class GenderController extends Controller
{
    public function index()
    {
        $genders = Gender::where('is_active', true)->get();
        return response()->json($genders);
    }
}
