<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|string|unique:users,email',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->mixedCase()->numbers()->symbols()
            ]
        ]);

        if ($validator->fails()) {
            $error_text = "";
            foreach ($validator->errors()->getMessages() as $field_name => $messages) {
                // Go through each message for this field.
                foreach ($messages as $message) {
                    $error_text = $error_text . $message;
                }
            }
            return response()->json(['success' => false, 'message' => $error_text]);
        }

        $user =User::create([
            'name' => $request->name,
            'email' => $request->email,
            'profile_image' => "images/profile/vector.png",
            'password' => bcrypt( $request->password)
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Account was successfully Created',
            'user' => $user,
            'token' =>$token
        ]);
    }


    public function login(Request $request){
        $credentials = $request->validate([
            'email' => 'required|email|string',
            'password' =>[
                'required',
            ],
            'remember' => 'boolean'
        ]);

        $remember = $credentials['remember']?? false;
        unset($credentials['remember']);

        if(!Auth::attempt($credentials, $remember)){
            return response(['error' => 'The Provided credentials are not correct'], 422);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function resetPassword(Request $request){

        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users',
        ]);

        if ($validator->fails()) {
            $error_text = "";
            foreach ($validator->errors()->getMessages() as $field_name => $messages) {
                // Go through each message for this field.
                foreach ($messages as $message) {
                    $error_text = $error_text . $message;
                }
            }
            return response()->json(['success' => false, 'message' => $error_text]);
        }

        $token = Str::random(64);
        DB::table('password_resets')->insert(
            ['email' => $request->email, 'token' => $token, 'created_at' => Carbon::now()]
        );

        Mail::send('customauth.verify', ['token' => $token], function ($message) use ($request) {
            $message->to($request->email);
            $message->subject('Reset Password Notification');
        });

        return response()->json(['success' => true, 'message' => "Password was successfully reset"]);
    }

    public function passwordChange(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->mixedCase()->numbers()->symbols()
            ]
        ]);

        if ($validator->fails()) {
            $error_text ="";

            foreach ($validator->errors()->getMessages() as $field_name => $messages) {
                // Go through each message for this field.
                foreach ($messages as $message) {
                   $error_text =$error_text . $message;
                }
            }
            return response()->json(['success' => false, 'message' => $error_text]);
        }


        $password = $request->old_password;
        $user = Auth::user();

        if (!Hash::check($password, $user->password)) {
            return response()->json(['success' => false, 'message' => 'Incorrect Old Password']);
        }
        $user->password = bcrypt($request->password);
        $user->save();

        return response()->json(['success' => true, 'message' => 'Password was successfully updated']);
    }

    public function  logout(){

        /** @var User $user */
        $user  = Auth::user();
        $user->currentAccessToken()->delete();

        return response([
            'success' => true
        ]);
    }
}
