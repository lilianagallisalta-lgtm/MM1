<?php

namespace App\Modules\Stage\Graphql\Types;

use App\Modules\Child\Models\Child;
use App\Modules\Plan\Models\Plan;
use App\Modules\Plan\Rules\UserOwnsPlan;
use App\Modules\Stage\Models\Stage;
use Illuminate\Support\Arr;

class StageQuestionsField
{

    public function handle(Stage $root, array $args)
    {
        $plan = Plan::with(['ageRange', 'child'])->whereUuid(Arr::get($args, 'planId'))->first();

        (new UserOwnsPlan(me()))->passes('planId', $plan->id);

        return $root
            ->questions()
            ->where('questions.ageRange_id', '=', $plan->ageRange->id)
            ->get()
            ->map(function ($question) use ($root, $plan) {
                $question->display = str_replace('#Nombreniñ@', title_case($plan->child->name), $question->display);
                return $question;
            });
    }

}