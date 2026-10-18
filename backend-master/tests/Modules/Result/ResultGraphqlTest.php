<?php

namespace Tests\Modules\Result;

use App\Modules\Question\Models\AgeRange;
use App\Modules\Question\Models\Area;
use App\Modules\Result\Models\AvailableResult;
use App\Modules\Stage\Models\Stage;
use Illuminate\Support\Arr;
use Tests\GraphqlTestCase;

class ResultGraphqlTest extends GraphqlTestCase
{

    /**
     * Chequea la integridad de `AvailableResult`.
     * 3 etapas
     *  -> 3 rango de edades
     *      -> 3 areas
     *          -> 4 subareas
     *              -> 4 tipos de resultados
     * = 144 `availableResult` por etapa.
     */
    public function testIntegrity()
    {
        $expected = [
            'agesRanges' => [
                '1' => [
                    'stages' => 3,
                ],
                '2' => [
                    'stages' => 3,
                ],
                '3' => [
                    'stages' => 3,
                ],
                '4' => [
                    'stages' => 2,
                ],
                '5' => [
                    'stages' => 2,
                ],
                '6' => [
                    'stages' => 2,
                ],
                '7' => [
                    'stages' => 2,
                ],
            ],
        ];

//        $stage = Stage::where('slug', '=', '1')->first();

        foreach (AgeRange::all() as $ageRange) {
            $stages = Stage::byAgeRange($ageRange)->get();
            $this->assertEquals(
                Arr::get($expected, "agesRanges.{$ageRange->min}.stages"),
                $stages->count()
            );

            foreach ($stages as $stage) {
                foreach (Area::all() as $area) {
                    $availableResultsQB = AvailableResult::query()
                        ->where('stage_id', '=', $stage->id)
                        ->where('ageRange_id', '=', $ageRange->id)
                        ->where('area_id', '=', $area->id);

                    // Por cada área, hay 4 subareas. Por cada subarea hay 4 tipos de
                    // resultados. Entonces, por área, hay 16 `availableResults`.
                    $this->assertEquals(16, $availableResultsQB->count());
                }
            }
        }
    }

}