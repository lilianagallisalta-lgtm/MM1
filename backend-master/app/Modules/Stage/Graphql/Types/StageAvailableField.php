<?php

namespace App\Modules\Stage\Graphql\Types;

use App\Modules\Plan\Models\Plan;
use App\Modules\Plan\Rules\UserOwnsPlan;
use App\Modules\Stage\Models\Stage;
use App\Modules\Stage\Rules\StageIsAvailableForChild;
use Illuminate\Support\Arr;

class StageAvailableField
{

    /**
     * Indica si la etapa está disponible para el usuario logueado, teniendo
     * en cuenta su suscripción.
     * @param Stage $root
     * @param array $args
     *
     * @return bool
     */
    public function handle(Stage $root, array $args)
    {
        $plan = Plan::with(['child'])->whereUuid(Arr::get($args, 'planId'))->first();

        (new UserOwnsPlan(me()))->passes('planId', $plan->id);

        return (new StageIsAvailableForChild($plan->child))->passes('stageId', $root->id);
    }

}