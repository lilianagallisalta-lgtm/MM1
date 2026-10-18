<?php

namespace App\Modules\Child\Graphql\Types;

use App\Modules\Child\Models\Child;

class ChildLicensePriceField
{

    public function handle(Child $root, array $args): float
    {
        return 799;
    }

}