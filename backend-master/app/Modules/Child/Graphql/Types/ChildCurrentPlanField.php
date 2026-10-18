<?php

namespace App\Modules\Child\Graphql\Types;

use App\Modules\Child\Models\Child;

class ChildCurrentPlanField
{

    public function handle(Child $root, array $args)
    {
        return $root->plans()->uncompleted()->first();
    }

}