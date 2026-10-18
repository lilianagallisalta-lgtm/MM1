<?php

namespace App\Modules\Upload\Controllers\Api;

use App\Modules\Upload\Models\Upload;
use App\Modules\Upload\Requests\UploadPostRequest;
use App\Modules\Upload\Requests\UploadPutRequest;
use App\Modules\Upload\Resources\UploadCollectionResource;
use App\Modules\Upload\Resources\UploadItemResource;
use Hawk\Support\Http\Responses\DeletedItemResponse;

class UploadApiController extends \App\Http\Controllers\Controller
{
    public function all()
    {
        $uploads = Upload::with(
                Upload::getRelationshipsToInclude()
            )
            ->paginate();

        return new UploadCollectionResource($uploads);
    }

    public function one($uploadId)
    {
        $upload = Upload::findOrFail($uploadId);

        return new UploadItemResource($upload);
    }

    public function post(UploadPostRequest $request)
    {
        $upload = Upload::create($request->input('data.attributes'));

        return new UploadItemResource($upload);
    }

    public function put($uploadId, UploadPutRequest $request)
    {
        $upload = Upload::findOrFail($uploadId);

        tap($upload)
            ->update($request->input('data.attributes'));

        return new UploadItemResource($upload);
    }

    public function delete($uploadId)
    {
        $upload = Upload::findOrFail($uploadId);

        $upload->delete();

        return new DeletedItemResponse("upload deleted");
    }
}