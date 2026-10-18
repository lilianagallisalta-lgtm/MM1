<?php

use Cake\Chronos\Chronos;
use Faker\Generator as Faker;

$factory->define(\Hawk\PromotionCode\Models\PromotionCode::class, function (Faker $faker) {
    $start = Chronos::now()->addDays($faker->randomNumber(1));
    $end = $start->addDays($faker->randomNumber(1));

    return [
        'code' => $faker->numerify('######'),
        'percentage' => ( $faker->numberBetween(1, 30) / 100 ),
        'start' => $start,
        'end' => $end,
//        'deleted_at' => $end,
    ];
});

$factory->state(\Hawk\PromotionCode\Models\PromotionCode::class, 'past', function (Faker $faker) {
    $start = Chronos::now()->subDays($faker->randomNumber(1));
    $end = $start->subDays($faker->randomNumber(1));

    return [
        'code' => $faker->numerify('######'),
        'percentage' => ( $faker->numberBetween(1, 30) / 100 ),
        'start' => $start,
        'end' => $end,
        'deleted_at' => $end,
    ];
});