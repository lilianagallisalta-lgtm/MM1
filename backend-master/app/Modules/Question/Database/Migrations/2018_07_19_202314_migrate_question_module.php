<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Migrations\Migration;

class MigrateQuestionModule extends Migration
{
    public function up()
    {
        Schema::create('areas', function (Blueprint $table) {
            $table->increments('id');

            $table->json('name');
            $table->string('slug')->unique();
            $table->string('picture');

            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('subareas', function (Blueprint $table) {
            $table->increments('id');

            $table->json('name');
            $table->string('slug')->unique();

            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('answerOptions', function (Blueprint $table) {
            $table->increments('id');

            $table->json('display');
            $table->string('slug')->unique()->index();

            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('questions', function (Blueprint $table) {
            $table->increments('id');

            $table->json('display');
            $table->json('extra_attributes');

            $table->belongsTo('stage', 'stages');
            $table->belongsTo('ageRange', 'agesRanges');
            $table->belongsTo('area', 'areas');
            $table->belongsTo('subarea', 'subareas');

            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('answers', function (Blueprint $table) {
            $table->increments('id');

            $table->belongsTo('user', 'users');
            $table->belongsTo('plan', 'plans');
            $table->belongsTo('question', 'questions');
            $table->belongsTo('answerOption', 'answerOptions');

            $table->timestamps();
            $table->softDeletes();
        });


    }
}
