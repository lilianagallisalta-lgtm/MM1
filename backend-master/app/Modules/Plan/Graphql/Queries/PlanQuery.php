<?php

namespace App\Modules\Plan\Graphql\Queries;

use App\Modules\Plan\Models\Plan;
use App\Modules\Plan\Rules\UserOwnsPlan;
use Illuminate\Support\Arr;

class PlanQuery
{

    public function handle($root, array $args)
    {
        $plan = Plan::whereUuid(Arr::get($args, 'planId'))->first();

        (new UserOwnsPlan(me()))->passes('planId', $plan->id);

        return $plan;
    }

}