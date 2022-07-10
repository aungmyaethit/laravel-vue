<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use Illuminate\Support\Str;
use GuzzleHttp\Psr7\Request;
use App\Http\Resources\ShopResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use App\Http\Requests\StoreShopRequest;
use App\Http\Requests\UpdateShopRequest;

class ShopController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();

        if($user->is_admin){
            return ShopResource::collection(Shop::paginate(9));
        }
        return ShopResource::collection(Shop::where('user_id', $user->id)->paginate(9));

    }

    public function shopLocation()
    {
        $user = Auth::user();
        if ($user->is_admin) {
            return ShopResource::collection(Shop::all());
        }
        return ShopResource::collection(Shop::where('user_id', $user->id)->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreShopRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreShopRequest $request)
    {
        $user = Auth::user();
        $data = $request->validated();
        if(isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;
        }
        $data['user_id'] = $user->id;
        $result = Shop::create($data);
         return new ShopResource($result);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Shop  $shop
     * @return \Illuminate\Http\Response
     */
    public function show(Shop $shop)
    {
        $user =Auth::user();
        if($user->id !== $shop->user_id && !$user->is_admin){
            return abort(403, 'Unauthorized action.');
        }
        return new ShopResource($shop);
    }

    public function showForGuest(Shop $shop){
        return new ShopResource($shop);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateShopRequest  $request
     * @param  \App\Models\Shop  $shop
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateShopRequest $request, Shop $shop)
    {
        $data = $request->validated();

        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;

            if($shop->image){
                $absolutePath = public_path($shop->image);
                File::delete($absolutePath);
            }
        }
        $shop->update($data);
        return new ShopResource($shop);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Shop  $shop
     * @return \Illuminate\Http\Response
     */
    public function destroy(Shop $shop)
    {
        $user = Auth::user();
        if ($user->id !== $shop->user_id && !$user->is_admin) {
            return abort(403, 'Unauthorized action.');
        }
        if ($shop->image) {
            $absolutePath = public_path($shop->image);
            File::delete($absolutePath);
        }
        $shop->delete();
        return response('',204);
    }

    private function saveImage($image){
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
