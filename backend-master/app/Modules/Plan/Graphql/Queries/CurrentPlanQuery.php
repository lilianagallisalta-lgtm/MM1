<?php

namespace App\Modules\Plan\Graphql\Queries;

use App\Modules\Child\Models\Child;
use App\Modules\Child\Rules\UserCanSeeChild;
use Hawk\LighthouseExtended\Exceptions\HkGraphqlError;
use Illuminate\Support\Arr;

class CurrentPlanQuery
{

    public function handle($root, array $args)
    {
        $child = Child::whereUuid(Arr::get($args, 'childId'))->first();
        if (! (new UserCanSeeChild(me()))->passes('childId', $child->id)) {
            throw new HkGraphqlError(___('No puedes ver a est@ niñ@'));
        };
        return $child->plans()->uncompleted()->first();
    }

}