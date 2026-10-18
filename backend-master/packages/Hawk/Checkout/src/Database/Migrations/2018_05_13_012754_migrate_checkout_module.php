<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Migrations\Migration;

class MigrateCheckoutModule extends Migration
{

    public function up()
    {
        Schema::create('paymentMethods', function (Blueprint $table) {
            $table->increments('id');

            $table->string('slug')->unique();
            $table->json('name');
            $table->json('description');
            $table->decimal('charge', 15, 2);
            $table->string('picture');

            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('checkouts', function (Blueprint $table) {
            $table->increments('id');

            $table->json('description');

            $table->belongsTo('paymentMethod', 'paymentMethods');
            $table->nullableMorphs('checkable');

            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('checkoutsDetails', function (Blueprint $table) {
            $table->increments('id');

            $table->nullableMorphs('checkable');
            $table->json('description');
            $table->string('picture')->nullable();
            $table->decimal('price', 15, 2);

            $table->belongsTo('checkout', 'checkouts');

            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('payments', function (Blueprint $table) {
            $table->increments('id');

            $table->decimal('amount', 15, 2);
            $table->json('extra_attributes');

            $table->morphs('payable');
            $table->nullableMorphs('via');
            $table->belongsTo('paymentMethod', 'paymentMethods');

            $table->timestamps();
            $table->softDeletes();
        });
    }

}
