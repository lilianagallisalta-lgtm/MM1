<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MigratePriceModule extends Migration
{
    public function up()
    {
        Schema::create('pricesTypes', function (Blueprint $table) {
            $table->increments('id');

            $table->json('name');
            $table->string('slug')->unique()->index();
            $table->boolean('default')->default(false);

            $table->timestamps();
        });

        Schema::create('priceable_priceType', function (Blueprint $table) {
            $table->increments('id');

            $table->belongsTo('priceType', 'pricesTypes');
            $table->morphs('priceable');
        });

        Schema::create('prices', function (Blueprint $table) {
            $table->increments('id');

            $table->decimal('price', 15, 2);
            $table->boolean('perDay');
            $table->timestamp('from')->nullable();
            $table->timestamp('to')->nullable();
            $table->json('extra_attributes');

            $table->morphs('priceable');
            $table->belongsTo('priceType', 'pricesTypes');

            $table->timestamps();
        });
    }
}
