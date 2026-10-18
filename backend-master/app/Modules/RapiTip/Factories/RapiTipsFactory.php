<?php

use Faker\Generator as Faker;

$factory->define(\App\Modules\RapiTip\Models\RapiTip::class, function (Faker $faker) {
    return [
        'title' => $faker->text(100),
        'body' => $faker->paragraphs(5, true),
        'picture' => $faker->imageUrl(),
    ];
});

//$factory->state(\App\Modules\RapiTip\Models\RapiTips::class, 'custom-state', function (Faker $faker) {
//    return [];
//});