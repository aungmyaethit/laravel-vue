<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class UserContorller extends Controller
{
    public function index(){
        $user = Auth::user();
        $user->profile_image_url = ($user->profile_image ? URL::to($user->profile_image) : null);
        $user->profile_image = null;
        $user->bg_image_url = ($user->bg_image ? URL::to($user->bg_image) : null);
        $user->bg_image = null;
        return $user;
    }

    public function profileUpdate(Request $request){

        $password = $request->password;
        $user= Auth::user();
        if (!Hash::check($password, $user->password)) {
            return response()->json(['success'=>false, 'message' => 'Incorrect Password']);
        }

        if (isset($request->profile_image)) {
            $relativePath = $this->saveImage($request->profile_image);
            $request->profile_image = $relativePath;
            $user->profile_image =  $request->profile_image;
        }

        if (isset($request->bg_image)) {
            $relativePath = $this->saveImage($request->bg_image);
            $request->bg_image = $relativePath;
            $user->bg_image =  $request->bg_image;
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->save();
        return response()->json(['success' => true, 'message' => 'User was successfully updated', 'data' => $user]);
    }

    private function saveImage($image)
    {
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {

            $image = substr($image, strpos($image, ',') + 1);

            $type = strtolower($type[1]);

            if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new \Exception('invalid image type');
            }
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if ($image === false) {
                throw new \Exception('base64_decode failed');
            }
        } else {
            throw new \Exception('did not match data URI with image data');
        }

        $dir = 'images/';
        $file = Str::random() . '.' . $type;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;
        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $image);

        return $relativePath;
    }

}
