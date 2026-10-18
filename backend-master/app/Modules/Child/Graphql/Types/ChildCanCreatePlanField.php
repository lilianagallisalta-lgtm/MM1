<?php

namespace App\Modules\Child\Graphql\Types;

use App\Modules\Child\Models\Child;
use App\Modules\Plan\Rules\ChildCanCreateNewPlan;

class ChildCanCreatePlanField
{

    public function handle(Child $root, array $args)
    {
        return (new ChildCanCreateNewPlan($root))->passes('childId', $root->id);
    }

}