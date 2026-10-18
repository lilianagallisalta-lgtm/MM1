<?php

namespace Hawk\Stock\Graphql\Queries;

use Hawk\Stock\Models\ReservableStockList;

class ReservableStocksListsQuery
{

    public function reservableStocksLists($root, array $args)
    {
        return ReservableStockList::query()
            ->where('stockeable_type', '=', array_get($args, 'stockeableType'))
            ->when(array_get($args, 'stockeableId'), function ($query, $stockeableId) {
                return $query->where('stockeable_id', '=', $stockeableId);
            })
            ->when(array_get($args, 'slug'), function ($query, $slug) {
                return $query->where('slug', '=', $slug);
            })
            ->get();
    }

}