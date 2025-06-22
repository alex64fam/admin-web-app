<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ConnectionCode;
use App\Models\Couple;
use App\Models\User;
use Illuminate\Http\Request;

class CoupleController extends Controller
{
    public function verifyCouple(Request $request)
    {
        if (!$request->has('user_id'))
            return response()->json([
                'type' => 'error',
                'message' => 'No se ha enviado el usuario',
                'couple' => null
            ]);
        $user = User::find($request->user_id);
        if ($user->couples()->count() > 0)
            return response()->json([
                'type' => 'success',
                'couple' => $user->userCouple()
            ]);
        return response()->json([
            'type' => 'error',
            'message' => 'No tienes una relación',
            'couple' => null
        ]);
    }

    // Funcion que recibe un codigo de sincronizacion generado por usuario donde se enlazarán para crear un nuevo registro couple
    public function syncCouple(Request $request)
    {
        $connectionCode = ConnectionCode::where('code', $request->code)->where('created_at', '>=', now()->subMinutes(15));
        if (!$connectionCode->exists())
            return response()->json([
                'type' => 'error',
                'message' => 'El código es incorrecto',
            ]);

        $couple = Couple::create([
            'user_id_1' => $connectionCode->first()->user_id,
            'user_id_2' => $request->user_id,
            'relationship_status_id' => 1
        ]);

        $connectionCode->delete();

        return response()->json([
            'message' => 'Conectaste con tu pareja ' . $couple->user_id_2,
            'type' => 'success'
        ], 200);
    }

    public function generateCode(Request $request)
    {
        $code = null;
        do {
            $code = \Illuminate\Support\Str::upper(\Illuminate\Support\Str::random(8));
        } while (ConnectionCode::where('code', $code)->where('created_at', '>=', now()->subMinutes(15))->exists());
        ConnectionCode::create([
            'user_id' => $request->user_id,
            'code' => $code
        ]);

        return response()->json([
            'data' => [
                'code' => $code
            ],
            'message' => 'Código generado con éxito',
            'type' => 'success'
        ], 200);
    }
}
