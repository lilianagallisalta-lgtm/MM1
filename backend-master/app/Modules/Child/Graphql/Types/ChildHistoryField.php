<?php

namespace App\Modules\Child\Graphql\Types;

use App\Modules\Child\Models\Child;
use App\Modules\Plan\Models\Plan;
use App\Modules\Question\Models\Area;
use App\Modules\Result\Models\Result;

class ChildHistoryField
{

    public function handle(Child $root, array $args)
    {
        if ($root->plans()->completed()->count() < 2) {
            return null;
        }

        $output = collect(
            Area::all()->map(function ($area) use ($root) {
                return [
                    'name' => $area->name,
                    'series' => $root->plans()->completed()->get()->map(function (Plan $plan) use ($area) {
                        return [
                            'name' => $plan->idx . '° Plan',
                            'value' => round(
                                Result::query()
                                    ->where('plan_id', '=', $plan->id)
                                    ->where('area_id', '=', $area->id)
                                    ->average('percentage') * 100
                            ),
                        ];
                    }),
                ];
            })
        );

        return json_encode($output);
    }

}