<?php

use Faker\Generator as Faker;

$factory->define(App\Hawk\User\Models\User::class, function (Faker $faker) {
    return [
        'firstname' => $faker->firstName,
        'lastname' => $faker->lastName,
        'email' => $faker->email,
        'country' => $faker->country,
        'province' => $faker->country,
        'password' => Hash::make(str_random(6)),
        'picture' => null,
    ];
});

//$factory->state(\Hawk\Checkout\Models\Checkout::class, 'custom-state', function (Faker $faker) {
//    return [];
//});