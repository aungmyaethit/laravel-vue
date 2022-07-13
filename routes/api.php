<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\UserContorller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/user/password', [ AuthController::class, 'passwordChange']);
    Route::get( '/user', [ UserContorller::class, 'index']);
    Route::post('/user/profile', [ UserContorller::class, 'profileUpdate']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::resource('/shop', ShopController::class);
    Route::get('/shop-location', [ShopController::class, 'shopLocation']);
    Route::post('/shop/filter' , [ShopController::class, 'shopFilter']);
    Route::post('/shop/search' , [ShopController::class, 'shopSearch']);
});

Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::get('/shop-by-slug/{shop:slug}', [ShopController::class, 'showForGuest']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
