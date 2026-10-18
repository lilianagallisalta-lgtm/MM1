<?php

namespace App\Modules\Result\Services;

class ResultCalculator
{

    /**
     * Devuelve el puntaje para un `answer slug` dado.
     * @param string $answerSlug
     *
     * @return int
     */
    public static function getPointFromAnswerSlug(string $answerSlug): float
    {
        switch ($answerSlug) {
            case 'always':
                return 5;

            case 'sometimes':
                return 1;

            case 'never':
            default:
                return 0;
        }
    }

    /**
     * Devuelve el `status` que le corresponde a una determinada cantidad de `points`.
     * @param int $points
     *
     * @return string
     */
    public static function getResultSlugFromPoints(int $points)
    {
        switch ($points) {
            case 15:
                return 'good'; // 100%

            case 11:
            case 5:
            case 6:
            case 10:
                return 'so so'; // 50.01 - 100 %

            case 1:
            case 7:
            case 2:
            case 0:
                return 'bad'; // 0.01 - 50%

            case 3:
                return 'very bad'; // 0%
        }
    }

    /**
     * Calcula un porcentaje para un `result slug` dado.
     * @param $points
     *
     * @return float|int
     */
    public static function getPercentageFromResultSlug(string $resultSlug): float
    {
        $faker = \Faker\Factory::create();

        $percentage = null;
        switch ($resultSlug) {
            case 'good':
                $percentage = $faker->numberBetween(90, 100);
                break;

            case 'so so':
                $percentage = 60;
                break;

            case 'bad':
                $percentage = 30;
                break;

            case 'very bad':
                $percentage = 10;
                break;
        }

        return $percentage > 0 ? $percentage / 100 : 0;
    }

    public static function getResultSlugFromPercentage(float $percentage)
    {
        if ($percentage == 1) {
            return 'good';
        } elseif ($percentage < 1 && $percentage >= 0.5) {
            return 'so so';
        } elseif ($percentage < 0.5 && $percentage >= 0.1) {
            return 'bad';
        } else {
            return 'very bad';
        }
    }

}