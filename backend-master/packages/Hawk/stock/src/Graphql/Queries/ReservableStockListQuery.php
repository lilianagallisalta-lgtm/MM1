<?php

namespace Hawk\Stock\Graphql\Queries;

use Hawk\Stock\Models\ReservableStockList;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Arr;

class ReservableStockListQuery
{

    public function handle($root, array $args)
    {
        $qb = ReservableStockList::query()
            ->where('slug', '=', Arr::get($args, 'slug'))
            ->where('stockeable_type', '=', Arr::get($args, 'stockeableType'))
            ->where('stockeable_id', '=', Arr::get($args, 'stockeableId'));

        foreach (Arr::get($args, 'taxons', []) as $taxonArg) {
            $model = Relation::getMorphedModel(Arr::get($taxonArg, 'taxonType'));
            $qb = $qb->byTaxon($model::find(Arr::get($taxonArg, 'taxonId')));
        }

        return $qb->first();
    }

}