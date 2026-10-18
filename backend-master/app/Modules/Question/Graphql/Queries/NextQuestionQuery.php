<?php

namespace App\Modules\Question\Graphql\Queries;

use App\Modules\Plan\Models\Plan;
use App\Modules\Plan\Rules\UserOwnsPlan;
use App\Modules\Question\Models\Question;
use App\Modules\Stage\Models\Stage;
use Illuminate\Support\Arr;

class NextQuestionQuery
{

    public function handle($root, array $args): ?Question
    {
        $stage = Stage::findByIdOrSlugOrFail(Arr::get($args, 'stageId'));

        $plan = Plan::with(['ageRange'])->whereUuid(Arr::get($args, 'planId'))->first();

        (new UserOwnsPlan(me()))->passes('planId', $plan->id);

        $nextQuestion = Question::nextForPlan($plan, $stage)->first();
        if (! $nextQuestion) {
            return null;
        }
        $nextQuestion->display = str_replace('#Nombreniñ@', title_case($plan->child->name), $nextQuestion->display);
        return $nextQuestion;
    }

}