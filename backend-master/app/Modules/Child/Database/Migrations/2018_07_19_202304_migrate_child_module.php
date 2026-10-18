<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Migrations\Migration;

class MigrateChildModule extends Migration
{
    public function up()
    {

        Schema::create('agesRanges', function (Blueprint $table) {
            $table->increments('id');

            $table->json('display');
            $table->integer('min');
            $table->integer('max');

            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('children', function (Blueprint $table) {
            $table->increments('id');
            $table->uuid('uuid')->index();

            $table->string('name');
            $table->date('birthdate');
            $table->string('gender');
            $table->string('picture');

            $table->belongsTo('ageRange', 'agesRanges');
            $table->belongsTo('user', 'users');

            $table->timestamps();
            $table->softDeletes();
        });
    }
}
