<?php

namespace App\Modules\Stage\Database\Seeds;

use App\Modules\Price\Graphql\Mutations\UpsertPriceMutation;
use App\Modules\Stage\Models\Stage;
use Hawk\LighthouseExtended\Support\Mutations\Mutate;

class StageModuleSeeder extends \Illuminate\Database\Seeder
{
    public function run()
    {
        $stages = [
            [
                'slug' => '1',
                'display' => [
                    'es_AR' => 'Primera etapa',
                ],
            ],
            [
                'slug' => '2',
                'display' => [
                    'es_AR' => 'Segunda etapa',
                ],
            ],
            [
                'slug' => '3',
                'display' => [
                    'es_AR' => 'Tercera etapa',
                ],
            ],
        ];

        foreach ($stages as $stageInput) {
            $stage = Stage::create($stageInput);

            $stage->setPriceType('unique');
            Mutate::fromClass(UpsertPriceMutation::class, [
                'price' => 200,
                'perDay' => false,
                'priceableType' => 'stages',
                'priceableId' => $stage->id,
            ]);
        }
    }
}