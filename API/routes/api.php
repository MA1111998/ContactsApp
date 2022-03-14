<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactsController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;



// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::middleware('auth:users')->post('/logout', [UserController::class, 'logout']);
Route::middleware('auth:users')->get('/contacts', [ContactsController::class, 'index']);
Route::middleware('auth:users')->get('/contact/{id}', [ContactsController::class, 'show']);
Route::middleware('auth:users')->post('/contacts', [ContactsController::class, 'store']);
Route::middleware('auth:users')->put('/contacts/{id}', [ContactsController::class, 'update']);
Route::middleware('auth:users')->delete('/contacts/{id}', [ContactsController::class, 'destroy']);

Route::middleware('auth:admins')->get('/users', [UserController::class, 'index']);
Route::middleware('auth:admins')->get('/users/{id}', [UserController::class, 'show']);
Route::middleware('auth:admins')->put('/users/{id}', [UserController::class, 'update']);
Route::middleware('auth:admins')->delete('/users/{id}', [UserController::class, 'destroy']);

Route::post('/admin/login', [AdminController::class, 'login']);

Route::middleware('auth:admins')->post('/admin/logout', [AdminController::class, 'logout']);

// Route::middleware('auth:users')->get('/id', [ContactsController::class, 'test']);

// Route::post('/admin/login',function (Request $request){
//     $fields = $request->validate([
//         'username' => 'required|string',
//         'password' => 'required|string'
//     ]);

//     $admin = Admin::where('username',$fields['username'])->first();

//     if(!$admin || !Hash::check($fields['password'], $user->password)){
//         return Response([
//             'message' => "wrong creds"
//         ],401);
//     }

//     $token = $user->createToken('myapptoken')->plainTextToken;

//     $response = [
//         'user'=> $user,
//         'token'=> $token
//     ];

//     return Response($response,201););
// }
