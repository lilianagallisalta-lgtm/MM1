<?php

namespace App\Modules\Child\Graphql\Types;

use App\Modules\Child\Models\Child;

class ChildNextPlanAtField
{

    public function handle(Child $root, array $args)
    {
        if ($root->plans()->uncompleted()->count() > 0) {
            return null;
        }

        $lastPlan = $root->plans()->orderByDesc('created_at')->first();

        return $lastPlan->created_at->addSeconds(config('plan.can_create_every_seconds'));
    }

}