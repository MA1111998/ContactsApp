<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function login(Request $request){
        $fields = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string'
        ]);

        $admin = Admin::where('username',$fields['username'])->first();

        if(!$admin || !Hash::check($fields['password'], $admin->password)){
            return Response([
                'message' => "wrong creds"
            ],401);
        }

        $token = $admin->createToken('admintoken')->plainTextToken;

        $response = [
            'admin'=> $admin,
            'token'=> $token
        ];

        return Response($response,201);
    }

    public function logout(Request $request){
        auth()->user()->tokens()->delete();

        return Response([
            'isLoggedOut' => true
        ],200);
    }
}
