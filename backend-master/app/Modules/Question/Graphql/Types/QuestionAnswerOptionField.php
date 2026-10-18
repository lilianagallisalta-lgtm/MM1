<?php

namespace App\Modules\Question\Graphql\Types;

use App\Modules\Child\Models\Child;
use App\Modules\Plan\Models\Plan;
use App\Modules\Question\Models\Question;
use Illuminate\Support\Arr;

class QuestionAnswerOptionField
{

    public function handle(Question $root, array $args)
    {
        $plan = Plan::query()
            ->with([
                'answers' => function ($query) use ($root) {
                    return $query->where('answers.question_id', '=', $root->id);
                }
            ])
            ->whereUuid(Arr::get($args, 'planId'))
            ->first();

        $answer = $plan->answers()
            ->where('answers.question_id', '=', $root->id)
            ->first();

        return optional($answer)->answerOption;
    }

}