<?php

namespace App\Modules\Question\Graphql\Queries;

use App\Modules\Plan\Models\Plan;
use App\Modules\Plan\Rules\UserOwnsPlan;
use App\Modules\Stage\Models\Stage;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Arr;

class QuestionsQuery
{

    public function handle($root, array $args): ?Collection
    {
        $plan = Plan::with(['ageRange'])->whereUuid(Arr::get($args, 'planId'))->first();

        (new UserOwnsPlan(me()))->passes('planId', $plan->id);

        $stage = Stage::query()
            ->with([
                'questions' => function ($query) use ($plan) {
                    return $query
                        ->where('questions.ageRange_id', '=', $plan->ageRange->id)
                        ->with([
                            'answers' => function ($questionsQuery) use ($plan) {
                                return $questionsQuery->where('plan_id', '=', $plan->id);
                            }
                        ]);
                }
            ])
            ->where('id', '=', array_get($args, 'stageId'))
            ->firstOrFail();

        return $stage->questions()
            ->where('questions.ageRange_id', '=', $plan->ageRange->id)
            ->get();
    }

}