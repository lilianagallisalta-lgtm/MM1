<?php

namespace App\Modules\Stage\Graphql\Types;

use App\Modules\Plan\Models\Plan;
use App\Modules\Plan\Rules\UserOwnsPlan;
use App\Modules\Stage\Models\Stage;
use Illuminate\Support\Arr;

class StageProgressField
{

    /**
     * Progreso de la etapa para un determiado niño.
     * @param Stage $root
     * @param array $args
     *
     * @return float+
     */
    public function handle(Stage $root, array $args): float
    {
        $plan = Plan::with(['ageRange'])->whereUuid(Arr::get($args, 'planId'))->first();

        (new UserOwnsPlan(me()))->passes('planId', $plan->id);

        $stageQuestions = $root->questions()->byAgeRange($plan->ageRange);

        $planAnswers = $plan->answers()
            ->whereHas('question', function ($query) use ($stageQuestions, $plan) {
                $query->where('questions.ageRange_id', '=', $plan->ageRange->id)
                    ->whereIn('questions.id', $stageQuestions->pluck('id'));
            });

        $stageQuestionsCount = $stageQuestions->count();
        // TODO: Ver esto.
        if ($stageQuestionsCount) {
            return round($planAnswers->count() / $stageQuestionsCount, 2);
        } else {
            return 0;
        }
    }

}