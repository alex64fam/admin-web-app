<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Couple;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CoupleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $couples = Couple::all();
        return Inertia::render('admin/couples/index', ['couples' => $couples]);
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
    public function show(Couple $couple)
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
    public function update(Request $request, Couple $couple)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Couple $couple)
    {
        try {
            $couple->delete();
            return redirect()->route('admin.couples.index')->with('success', 'Pareja eliminada con éxito');
        } catch (Exception $e) {

        }
    }
}
