<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Language;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LanguageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $languages = Language::all();
        return Inertia::render('admin/languages/index', ['languages' => $languages]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:255',
            'is_active' => 'boolean'
        ];

        $request->validate($rules);

        Language::create($request->all());

        return redirect()->route('admin.languages.index')->with('success', 'Idioma creado correctamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Language $language)
    {
        $rules = [
            'name' =>'required|string|max:255',
            'code' =>'required|string|max:255',
            'is_active' => 'boolean'
        ];

        $request->validate($rules);
     
        $language->update($request->all());
        return redirect()->route('admin.languages.index')->with('success', 'Idioma actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Language $language)
    {
        $language->delete();
        return redirect()->route('admin.languages.index')->with('success', 'Idioma eliminado correctamente.');
    }
}
