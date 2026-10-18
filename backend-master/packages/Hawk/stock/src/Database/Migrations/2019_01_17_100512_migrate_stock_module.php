<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Migrations\Migration;

class MigrateStockModule extends Migration
{

    public function up()
    {
        Schema::create('stocks', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('currentStock');
            $table->integer('stockHaveLeft');
            $table->boolean('allowsNegative');

            $table->morphs('stockeable');

            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('reservableStocksLists', function (Blueprint $table) {
            $table->increments('id');

            $table->string('slug')->index();
            $table->json('display');
            $table->json('extra_attributes');

            $table->morphs('stockeable');

            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('reservableStockList_taxon', function (Blueprint $table) {
            $table->increments('id');

            $table->belongsTo('reservableStockList', 'reservableStocksLists');
            $table->morphs('taxon');

            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('reservableStocks', function (Blueprint $table) {
            $table->increments('id');

            $table->dateTime('start')->index();
            $table->dateTime('end')->index();
            $table->integer('stock');
            $table->boolean('allowsNegative');

            $table->belongsTo('reservableStockList', 'reservableStocksLists');

            $table->timestamps();
            $table->softDeletes();
        });
    }

}
