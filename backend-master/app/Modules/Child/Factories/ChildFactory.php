<?php

use App\Hawk\User\Models\User;
use App\Modules\Question\Models\AgeRange;
use Cake\Chronos\Chronos;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Storage;

$factory->define(\App\Modules\Child\Models\Child::class, function (Faker $faker) {
    $ageRange = AgeRange::inRandomOrder()->first();
    $gender = $faker->randomElement(['male', 'female']);

    return [
        'name' => $faker->name,
        'birthdate' => Chronos::now()->subYears($ageRange->min),
        'gender' => $gender,
        'picture' => $gender == 'male'
            ? Storage::disk('public')->url('children-picture/boy.png')
            : Storage::disk('public')->url('children-picture/girl.png'),
        'user_id' => function () {
            return factory(User::class)->create()->id;
        },
        'ageRange_id' => $ageRange->id,
    ];
});

//$factory->state(\App\Modules\Child\Models\Child::class, 'custom-state', function (Faker $faker) {
//    return [];
//});