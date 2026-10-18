<?php

use Faker\Generator as Faker;

$factory->define(\Hawk\Price\Models\Price::class, function (Faker $faker) {
    return [
        'price' => $faker->randomFloat(),
    ];
});

$factory->state(\Hawk\Price\Models\Price::class, 'unique', function (Faker $faker) {
    return [
        'price' => $faker->randomFloat(),
        'priceType_id' => \Hawk\Price\Models\PriceType::whereSlug('unique')->first()->id,
    ];
});
