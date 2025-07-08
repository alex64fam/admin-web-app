<?php

namespace App\Http\Controllers\Api;

use App\Events\UserPaired;
use App\Http\Controllers\Controller;
use App\Models\ConnectionCode;
use App\Models\Couple;
use App\Models\User;
use Illuminate\Http\Request;

class CoupleController extends Controller
{
    public function verifyCouple(Request $request)
    {
        $user = auth()->user();
        if ($user->couples()->count() > 0)
            return response()->json([
                'type' => 'success',
                //'couple' => $user->userCouple()->toArray()
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
            'user_id_2' => auth()->user()->id,
            'relationship_status_id' => 1
        ]);

        $connectionCode->delete();

        event(new UserPaired($couple->user_id_1, 'Tu parejita ' . auth()->user()->)); // Evento que avisa al usuario 1 que ya fue encontrado y sincronizado
        event(new UserPaired($couple->user_id_2)); // Evento que avisa al usuario 2 que ya encontró al otro usuario

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
        $connectionCode = ConnectionCode::create([
            'user_id' => auth()->user()->id,
            'code' => $code
        ]);

        return response()->json([
            'data' => [
                'code' => $connectionCode->code,
                'created_at' => $connectionCode->created_at
            ],
            'message' => 'Código generado con éxito',
            'type' => 'success'
        ], 200);
    }

    public function unSyncCouple(Request $request)
    {
        $user = auth()->user();
        $user->couple()->delete();
        return response()->json([
            'message' => 'Desconectaste con tu pareja',
            'type' => 'success'
        ], 200);
    }
}
