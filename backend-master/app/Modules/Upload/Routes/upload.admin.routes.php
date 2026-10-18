<?php

Route::namespace('Upload\Controllers\Admin')
    ->group(function () {
        Route::prefix('uploads')->group(function () {
            Route::post('', 'UploadAdminController@post');
        });
    });