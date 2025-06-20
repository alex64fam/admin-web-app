<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gender;
use App\Models\Language;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class GenderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $genders = Gender::all();
        $activeLanguages = Language::where('is_active', true)->get();
        return Inertia::render('admin/genders/index', [
            'genders'           => $genders,
            'activeLanguages'   => $activeLanguages
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rules = [
            'key' => 'required|string|max:255|unique:genders,key',
            'is_active' => 'boolean',
            'names.*' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:255'
        ];

        $request->validate($rules);

        $gender = Gender::create($request->all());

        foreach ($request->names as $locale => $name) {
            if ($name !== null) {
                $gender->translations()->create([
                    'locale' => $locale,
                    'name' => $name
                ]);
            }
        }

        return redirect()->route('admin.genders.index')->with('success', 'Género creado con éxito.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Gender $gender)
    {
        $rules = [
            'key' => ['required', 'string', 'max:255', Rule::unique('genders', 'key')->ignore($gender->id)],
            'is_active' => 'boolean',
            'names.*' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:255'
        ];

        $request->validate($rules);

        $gender->update($request->all());
        dd($gender->all());
        foreach ($request->names as $locale => $name) {
            if ($name !== null) {
                $gender->translations()->updateOrCreate([
                    'locale' => $locale,
                    'name' => $name
                ]);
            } else {
                $gender->translations()->where('locale', $locale)->delete();
            }
        }

        return redirect()->route('admin.genders.index')->with('success', 'Género actualizado con éxito.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gender $gender)
    {
        $gender->delete();
        return redirect()->route('admin.genders.index')->with('success', 'Género eliminado con éxito.');
    }
}
