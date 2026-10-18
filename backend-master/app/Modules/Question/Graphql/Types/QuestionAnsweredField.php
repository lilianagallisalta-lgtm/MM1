<?php

namespace App\Modules\Question\Graphql\Types;


use App\Modules\Child\Models\Child;
use App\Modules\Plan\Models\Plan;
use App\Modules\Plan\Rules\UserOwnsPlan;
use App\Modules\Question\Models\Question;
use App\Modules\Question\Rules\QuestionIsAnswered;
use Illuminate\Support\Arr;

class QuestionAnsweredField
{

    public function handle(Question $root, array $args): bool
    {
        $plan = Plan::whereUuid(Arr::get($args, 'planId'))->first();

        (new UserOwnsPlan(me()))->passes('planId', $plan->id);

        return (new QuestionIsAnswered($plan))->passes('questionId', $root->id);
//        $child = Child::query()
//            ->ofMe()
//            ->findOrFail(Arr::get($args, 'childId'));
//        return $child->answers()->where('question_id', '=', $root->id)->exists();
    }

}