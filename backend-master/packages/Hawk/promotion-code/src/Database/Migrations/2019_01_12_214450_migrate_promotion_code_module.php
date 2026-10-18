<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Migrations\Migration;

class MigratePromotionCodeModule extends Migration
{

    public function up()
    {
        Schema::create('promotionCodes', function (Blueprint $table) {
            $table->increments('id');

            $table->string('code')->unique();
            $table->decimal('percentage', 4, 2);
            $table->dateTime('start')->nullable();
            $table->dateTime('end')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

}
