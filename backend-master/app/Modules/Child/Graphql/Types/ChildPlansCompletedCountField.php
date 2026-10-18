<?php

namespace App\Modules\Child\Graphql\Types;

use App\Modules\Child\Models\Child;

class ChildPlansCompletedCountField
{

    public function handle(Child $root, array $args)
    {
        return $root->plans()->completed()->count();
    }

}