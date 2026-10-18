<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->uuid('uuid');

            $table->string('firstname');
            $table->string('lastname');
            $table->string('email')->unique();
            $table->string('country');
            $table->string('province');
            $table->string('picture')->nullable();
            $table->string('password');
            $table->schemalessAttributes('extra_attributes');

            $table->timestamps();
        });

        Schema::create('pushTokens', function (Blueprint $table) {
            $table->increments('id');

            $table->string('token');
            $table->json('extra_attributes')->nullable();

            $table->belongsTo('user', 'users');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('users');
    }
}
