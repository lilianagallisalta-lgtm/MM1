<?php

namespace App\Modules\Question\Database\Seeds;

use App\Modules\Question\Graphql\Mutations\QuestionUpsertMutation;
use App\Modules\Question\Models\AgeRange;
use App\Modules\Question\Models\Area;
use App\Modules\Question\Models\Subarea;
use App\Modules\Stage\Models\Stage;
use App\Shared\Seeders\HkSeeder;

class QuestionsSeeder extends HkSeeder
{
    public function run()
    {
        $this->questions();
    }

    public function questions()
    {
        $ageRanges = [
            '1-2' => AgeRange::whereMinAndMax(1, 2)->first(),
            '2-3' => AgeRange::whereMinAndMax(2, 3)->first(),
            '3-4' => AgeRange::whereMinAndMax(3, 4)->first(),
            '4-5' => AgeRange::whereMinAndMax(4, 5)->first(),
            '5-6' => AgeRange::whereMinAndMax(5, 6)->first(),
            '6-7' => AgeRange::whereMinAndMax(6, 7)->first(),
            '7-8' => AgeRange::whereMinAndMax(7, 8)->first(),
        ];

        $json = $this->readJson('all');

        foreach ($ageRanges as $key => $ageRange) {
            $json
                ->shuffle()
                ->filter(function ($result) use ($key) {
                    if ($key === '1-2') {
                        return array_get($result, 'EDAD') === '1 a 2 años';
                    } elseif ($key === '2-3') {
                        return array_get($result, 'EDAD') === '2 a 3 años';
                    } elseif ($key === '3-4') {
                        return array_get($result, 'EDAD') === '3 a 4 años';
                    } elseif ($key === '4-5') {
                        return array_get($result, 'EDAD') === '4 a 5 años';
                    } elseif ($key === '5-6') {
                        return array_get($result, 'EDAD') === '5 a 6 años';
                    } elseif ($key === '6-7') {
                        return array_get($result, 'EDAD') === '6 a 7 años';
                    } elseif ($key === '7-8') {
                        return array_get($result, 'EDAD') === '7 a 8 años';
                    }
                })
                ->map(function ($input, $idx) use ($ageRange) {
                    $area = Area::where('name->es_AR', '=', title_case(array_get($input, 'AREA')))->firstOrFail();

                    $subareaName = trim(title_case(collect(array_get($input, 'SUBAREA'))->first()));
                    $subarea = Subarea::firstOrCreate(
                        ['name' => $subareaName],
                        [
                            'name' => $subareaName,
                        ]
                    );

                    $stage = Stage::findByIdOrSlugOrFail(str_after( array_get($input, 'NIVEL'), 'Nivel '));

                    (new QuestionUpsertMutation([
                        'display' => [
                            'es_AR' => array_get($input, 'RAZONAMIENTO')
                        ],
                        'stageId' => $stage->id,
                        'areaId' => $area->id,
                        'subareaId' => $subarea->id,
                        'ageRangeId' => $ageRange->id,
                        'extra_attributes' => [
                            'idx' => $stage->questions()->byAgeRange($ageRange)->count() + 1,
                        ],
                    ]))->mutate();
                });
        }
    }

    public function readJson($json)
    {
        $fileContent = file_get_contents(__DIR__ . "/$json.json");

        return collect(json_decode($fileContent, true));
    }
}