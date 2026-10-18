<?php

namespace App\Modules\Result\Graphql\Queries;

use App\Modules\Question\Models\Area;
use App\Modules\Result\Models\AvailableResult;
use Illuminate\Support\Arr;

class ResultAreaQuery
{

    public function result($root, array $args)
    {
        $area = Area::findByIdOrSlugOrFail(Arr::get($root, 'slug'));

        // TODO: Agregar nivel a AvailableResults

        return AvailableResult::query()
            ->where('area_id', '=', $area->id)
            ->where('result', '=', Arr::get($root, 'result'))
            ->first();
    }

}