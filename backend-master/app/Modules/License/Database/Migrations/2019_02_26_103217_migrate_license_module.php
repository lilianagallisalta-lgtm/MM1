<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Migrations\Migration;

class MigrateLicenseModule extends Migration
{

    public function up()
    {
        Schema::create('licenses', function (Blueprint $table) {
            $table->increments('id');

            $table->string('uuid');
            $table->dateTime('expires_at');
            $table->belongsTo('child', 'children');

            $table->timestamps();
            $table->softDeletes();
        });
    }

}
