<?php

namespace App\Modules\Upload\Controllers\Admin;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class UploadAdminController extends \App\Http\Controllers\Controller
{
    public function post(Request $request)
    {
        $alias = request('alias', 'picture');
        $directory = Carbon::now()->format('Y/m/d/His');

        if ($request->file($alias)) {
            $picture = Image::make($request->file($alias));
        } else {
            throw new \Exception('File is required');
        }

        $picture->encode('jpeg');

        $filename = uniqid() . '.jpeg';

        \Storage::disk('admin-uploads')
            ->put("{$directory}/{$filename}", $picture->__toString(), 'public');

        $url = \Storage::disk('admin-uploads')
            ->url("{$directory}/{$filename}");

        return response()->json([
            'success' => true,
            'message' => 'Imágen subida correctamente',
            'data' => [
                'attributes' => [
                    'url' => $url,
                ],
            ],
        ]);
    }
}