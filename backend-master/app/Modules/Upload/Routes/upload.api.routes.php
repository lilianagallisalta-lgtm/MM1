<?php
//
//Route::namespace('Upload\Controllers\Api')
//    ->middleware('jwt.auth')
//    ->group(function () {
//        Route::prefix('uploads')->group(function () {
//            Route::get('', 'UploadApiController@all');
//            Route::post('', 'UploadApiController@post');
//
//            Route::prefix('{upload}Id}')->group(function () {
//                Route::get('', 'UploadApiController@one');
//
//                Route::put('', 'UploadApiController@put');
//                Route::delete('', 'UploadApiController@delete');
//            });
//        });
//    });