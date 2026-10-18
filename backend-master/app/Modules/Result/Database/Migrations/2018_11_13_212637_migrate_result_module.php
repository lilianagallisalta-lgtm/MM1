<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Migrations\Migration;

class MigrateResultModule extends Migration
{
    public function up()
    {
        Schema::create('games', function (Blueprint $table) {
            $table->increments('id');

            $table->json('title');
            $table->json('body');
            $table->json('materials');
            $table->schemalessAttributes('extra_attributes');

            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('suggestions', function (Blueprint $table) {
            $table->increments('id');

            $table->json('title');
            $table->json('body');
            $table->schemalessAttributes('extra_attributes');

            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('availableResults', function (Blueprint $table) {
            $table->increments('id');

            $table->string('result');
            $table->json('info');
            $table->schemalessAttributes('extra_attributes');

            $table->belongsTo('area', 'areas');
            $table->belongsTo('subarea', 'subareas');
            $table->belongsTo('ageRange', 'agesRanges');
            $table->belongsTo('stage', 'stages');

            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('availableResult_game', function (Blueprint $table) {
            $table->increments('id');

            $table->belongsTo('availableResult', 'availableResults');
            $table->belongsTo('game', 'games');

            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('availableResult_suggestion', function (Blueprint $table) {
            $table->increments('id');

            $table->belongsTo('availableResult', 'availableResults');
            $table->belongsTo('suggestion', 'suggestions');

            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('results', function (Blueprint $table) {
            $table->increments('id');

            $table->decimal('percentage', 5, 4);
            $table->string('slug');

            $table->belongsTo('plan', 'plans');
            $table->belongsTo('stage', 'stages');
            $table->belongsTo('area', 'areas');
            $table->schemalessAttributes('extra_attributes');

            $table->timestamps();
            $table->softDeletes();
        });
    }
}
