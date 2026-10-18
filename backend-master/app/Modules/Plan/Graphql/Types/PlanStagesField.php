<?php

namespace App\Modules\Plan\Graphql\Types;

use App\Modules\Plan\Models\Plan;
use App\Modules\Stage\Models\Stage;

class PlanStagesField
{

    public function handle(Plan $root, array $args)
    {
        return Stage::byAgeRange($root->ageRange)->get();
    }

}