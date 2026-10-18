<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Migrations\Migration;

class MigratePlanModule extends Migration
{

    public function up()
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->increments('id');
            $table->uuid('uuid')->index();

            $table->integer('idx');
            $table->dateTime('completed_at')->nullable();

            $table->belongsTo('child', 'children');
            $table->belongsTo('ageRange', 'agesRanges');

            $table->timestamps();
            $table->softDeletes();
        });
    }

}
