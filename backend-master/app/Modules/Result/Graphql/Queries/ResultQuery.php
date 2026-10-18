<?php

namespace App\Modules\Result\Graphql\Queries;

use App\Modules\Plan\Models\Plan;
use App\Modules\Plan\Rules\UserOwnsPlan;
use Illuminate\Support\Arr;

class ResultQuery
{

    public function handle($root, array $args)
    {
        $plan = Plan::whereUuid(Arr::get($args, 'planId'))->first();

        (new UserOwnsPlan(me()))->passes('planId', $plan->id);

        return $plan->results()->where('results.stage_id', $root->id)->first();
    }

}