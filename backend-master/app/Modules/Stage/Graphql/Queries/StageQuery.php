<?php

namespace App\Modules\Stage\Graphql\Queries;

use App\Modules\Stage\Models\Stage;
use Illuminate\Support\Arr;

class StageQuery
{

    public function handle($root, array $args)
    {
        return Stage::findByIdOrSlugOrFail(Arr::get($args, 'id'));
    }

}