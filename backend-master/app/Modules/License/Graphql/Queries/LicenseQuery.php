<?php

namespace App\Modules\License\Graphql\Queries;

use App\Modules\Child\Models\Child;
use App\Modules\Child\Rules\UserCanSeeChild;
use App\Modules\License\Models\License;
use Hawk\LighthouseExtended\Exceptions\HkGraphqlError;
use Illuminate\Support\Arr;

class LicenseQuery
{

    public function handle($root, array $args): License
    {
        $child = Child::whereUuid(Arr::get($args, 'childId'))->first();
        if (! (new UserCanSeeChild(me()))->passes('childId', $child->id)) {
            throw new HkGraphqlError(___('No puedes ver a est@ niñ@'));
        };
        return $child->licenses()->active()->first();
    }

}