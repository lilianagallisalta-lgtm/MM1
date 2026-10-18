<?php

namespace App\Modules\Stage\Graphql\Types;

use App\Modules\Stage\Models\Stage;
use Illuminate\Support\Arr;

class StageUnlockedField
{

    /**
     * Progreso de la etapa para un determiado niño.
     * @param Stage $root
     * @param array $args
     *
     * @return float+
     */
    public function handle(Stage $root, array $args)
    {
        if ($root->slug == 1) {
            return true;
        } else {
            $previousStage = Stage::whereSlug($root->slug - 1)->first();
            return (new StageProgressField())->handle($previousStage, ['planId' => Arr::get($args, 'planId')]) == 1;
        }
    }

}