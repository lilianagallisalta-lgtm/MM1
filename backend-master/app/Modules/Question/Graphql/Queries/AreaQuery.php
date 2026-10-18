<?php

namespace App\Modules\Question\Graphql\Queries;

use App\Modules\Plan\Models\Plan;
use App\Modules\Plan\Rules\UserOwnsPlan;
use App\Modules\Question\Models\Area;
use App\Modules\Result\Models\Result;
use Illuminate\Support\Arr;

class AreaQuery
{

    public function result(Area $root, array $args): ?Result
    {
        $plan = Plan::whereUuid(Arr::get($args, 'planId'))->first();

        (new UserOwnsPlan(me()))->passes('planId', $plan->id);

        return $plan->results()
            ->where('results.stage_id', '=', Arr::get($args, 'stageId'))
            ->where('results.area_id', '=', $root->id)
            ->first();
    }

    public function picture(Area $root, array $args): string
    {
        if ($root->slug == 'cuerpo' && Arr::get($args, 'childId')) {
            return optional(me()->children()->whereUuid(Arr::get($args, 'childId'))->first())->picture;
        }

        return $root->picture;
    }

}