<?php

namespace App\Modules\Child\Graphql\Types;

use App\Modules\Child\Models\Child;

class ChildHasActiveLicenseField
{

    public function handle(Child $root, array $args): bool
    {
        return $root
            ->licenses()
            ->active()
            ->count() > 0;
    }

}