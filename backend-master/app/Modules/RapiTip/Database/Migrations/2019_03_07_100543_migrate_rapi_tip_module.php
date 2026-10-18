<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Migrations\Migration;

class MigrateRapiTipModule extends Migration
{

    public function up()
    {
        Schema::create('rapiTips', function (Blueprint $table) {
            $table->increments('id');
            $table->uuid('uuid');

            $table->string('title');
            $table->text('body');
            $table->string('picture')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('rapiTip_user', function (Blueprint $table) {
            $table->increments('id');

            $table->belongsTo('rapiTip', 'rapiTips');
            $table->belongsTo('user', 'users');

            $table->timestamps();
        });
    }

}
