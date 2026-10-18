<?php

namespace App\Modules\Stage\Graphql\Queries;

use App\Modules\Plan\Models\Plan;
use App\Modules\Stage\Models\Stage;
use Illuminate\Support\Arr;

class StagesQuery
{

    public function handle($root, array $args)
    {
        $plan = Plan::with(['ageRange'])->whereUuid(Arr::get($args, 'planId'))->first();
        return Stage::byAgeRange($plan->ageRange)->get();
    }

}