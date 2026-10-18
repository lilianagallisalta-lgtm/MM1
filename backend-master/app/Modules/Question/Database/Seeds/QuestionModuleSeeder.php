<?php

namespace App\Modules\Question\Database\Seeds;

use App\Modules\Question\Models\AgeRange;
use App\Modules\Question\Models\AnswerOption;
use App\Modules\Question\Models\Area;
use App\Modules\Result\Models\ResultType;
use App\Modules\Question\Requests\QuestionUpsertRequest;
use App\Shared\Seeders\HkSeeder;
use Illuminate\Support\Facades\Storage;

class QuestionModuleSeeder extends HkSeeder
{
    public function run()
    {
        $this->areas();

        $this->agesRanges();

        $this->answerOptions();

        $this->resolve(QuestionsSeeder::class)->__invoke();
    }

    public function areas()
    {
        $areas = [
            [
                'name' => [
                    'es_AR' => 'Cuerpo',
                ],
                'picture' => 'body.svg',
            ],
            [
                'name' => [
                    'es_AR' => 'Mente',
                ],
                'picture' => 'brain.svg',
            ],
            [
                'name' => [
                    'es_AR' => 'Corazón',
                ],
                'picture' => 'heart.svg',
            ],
        ];

        foreach ($areas as $areaInput) {
            Area::create([
                'name' => array_get($areaInput, 'name'),
                'picture' => Storage::disk('public')
                    ->url('areas/' . array_get($areaInput, 'picture')),
            ]);
        }
    }

    public function agesRanges()
    {
        $agesRanges = [
            [
                'display' => [
                    'es_AR' => 'Niños de 12 a 24 meses',
                ],
                'min' => 1,
                'max' => 2,
            ],
            [
                'display' => [
                    'es_AR' => 'Niños de 2 a 3 años',
                ],
                'min' => 2,
                'max' => 3,
            ],
            [
                'display' => [
                    'es_AR' => 'Niños de 3 a 4 años',
                ],
                'min' => 3,
                'max' => 4,
            ],
            [
                'display' => [
                    'es_AR' => 'Niños de 4 a 5 años',
                ],
                'min' => 4,
                'max' => 5,
            ],
            [
                'display' => [
                    'es_AR' => 'Niños de 5 a 6 años',
                ],
                'min' => 5,
                'max' => 6,
            ],
            [
                'display' => [
                    'es_AR' => 'Niños de 6 a 7 años',
                ],
                'min' => 6,
                'max' => 7,
            ],
            [
                'display' => [
                    'es_AR' => 'Niños de 7 a 8 años',
                ],
                'min' => 7,
                'max' => 8,
            ],
        ];

        foreach ($agesRanges as $areaInput) {
            AgeRange::create(array_only($areaInput, [
                'display',
                'min',
                'max',
            ]));
        }
    }

    public function answerOptions()
    {
        $options = [
            [
                'slug' => 'always',
                'display' => [
                    'es_AR' => 'Siempre',
                    'en' => 'Always',
                ],
            ],
            [
                'slug' => 'sometimes',
                'display' => [
                    'es_AR' => 'A veces',
                    'en' => 'Some times',
                ],
            ],
            [
                'slug' => 'never',
                'display' => [
                    'es_AR' => 'Nunca',
                    'en' => 'Never',
                ],
            ],
        ];

        foreach ($options as $optionInput) {
            AnswerOption::create([
                'slug' => array_get($optionInput, 'slug'),
                'display' => array_get($optionInput, 'display'),
            ]);
        }
    }

    public function questions()
    {
        foreach (Area::all() as $area) {
            for ($i = 1; $i <= 5; $i++) {
                (new QuestionUpsertRequest([
                    'title' => [
                        'es_AR' => $this->faker->text(140),
                        'en' => $this->faker->text(140),
                    ],
                    'body' => [
                        'es_AR' => $this->faker->text(140),
                        'en' => $this->faker->text(140),
                    ],
                    'area_id' => $area->id,
                ]))->upsert();
            }
        }
    }
}