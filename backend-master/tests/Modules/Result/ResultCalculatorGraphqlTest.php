<?php

namespace Tests\Modules\Result;

use App\Modules\Result\Services\ResultCalculator;
use Tests\GraphqlTestCase;

class ResultCalculatorGraphqlTest extends GraphqlTestCase
{

    public function testCalculatePoints()
    {
        $answers = collect([
            [
                'slugs' => 'never never never',
                'result' => 'very bad',
                'info' => 'El área de la mente de Juan necesita mucha estimulación para prevenir dificultades.',
            ],
            [
                'slugs' => 'never * *',
                'result' => 'bad',
                'info' => '*',
            ],
            [
                'slugs' => 'never never always',
                'result' => 'bad',
                'info' => '*',
            ],
            [
                'slugs' => 'never never *',
                'result' => 'bad',
                'info' => '*',
            ],
            [
                'slugs' => '* * *',
                'result' => 'bad',
                'info' => 'El área de la mente de Juan necesita mucha estimulación para prevenir dificultades.',
            ],
            [
                'slugs' => 'never always always',
                'result' => 'so so',
                'info' => 'El área del desarrollo de la Mente de Juan es buena, con estimulación mejoraría notablemente.',
            ],
            [
                'slugs' => 'never always *',
                'result' => 'so so',
                'info' => 'asd',
            ],
            [
                'slugs' => 'always * *',
                'result' => 'so so',
                'info' => 'asd',
            ],
            [
                'slugs' => 'always always *',
                'result' => 'so so',
                'info' => 'asd',
            ],
            [
                'slugs' => 'always always always',
                'result' => 'good',
                'info' => 'Felicitaciones, el desarrollo del área de la Mente de Juan está acorde a los parametros requeridos para su edad.',
            ],
        ]);

        $answers = $answers->map(function ($value, $key) {
            $points = collect(explode(' ', array_get($value, 'slugs')))
                ->map(function ($slug) {
                    if ($slug == '*') {
                        $slug = 'sometimes';
                    }

                    return ResultCalculator::getPointFromAnswerSlug($slug);
                })
                ->sum();

            $result = ResultCalculator::getResultSlugFromPoints($points);

            $this->assertEquals(array_get($value, 'result'), $result);
        });
    }

}