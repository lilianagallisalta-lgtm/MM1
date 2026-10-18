<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Migrations\Migration;

class MigrateStageModule extends Migration
{
    public function up()
    {
        Schema::create('stages', function (Blueprint $table) {
            $table->increments('id');

            $table->json('display');
            $table->string('slug')->unique();

            $table->timestamps();
            $table->softDeletes();
        });
    }
}
