<?php

namespace App\Http\Controllers\APi;

use App\Http\Controllers\Controller;
use App\Models\User;
use GuzzleHttp\Promise\Create;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // API đăng kí tài khoản 
    public function register(Request $request){

        $message = [
            'email.email' => "Error emaillll",
            'email.required' => "Error required",
            'password.required' => "Error required"
        ];

        $validate = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'email|required',
            'password' => 'min:5|required'
        ],$message);

        if ($validate->fails()) {
            return response()->json([
                'message' => $validate->errors()
            ],404);
        } 

        User::create([
            'name' => $request->name,
            'email' => $request->email,
          'password' => Hash::make($request->password) 
        ]);

        return response()->json([
            'message' => 'created'
        ],200);
    }

    //API đăng nhập với sanctum
    public function login(Request $request) {

        $user = User::where('email', $request->email)->first();

        // return $user;

        if (!$user || !Hash::check($request->password, $user->password,[])){
            return response()->json([
                'message' => 'user not existt'
            ],400);
        }

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'type_token' => 'bearer'
        ],200);
    }
}
