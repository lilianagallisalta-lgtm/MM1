<?php

namespace Hawk\Stock\Traits;

use Hawk\Stock\Models\ReservableStockList;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait HasTeservableStockList
{

    /** Getters */

    public function getDefaultStockList()
    {
        return $this->stocksLists()->whereSlug('default')->first();
    }

    /** Utils */

    /**
     * Crea una nueva lista de stock.
     * @param array $attributes
     *
     * @return mixed
     */
    public function createStockList(array $attributes = [])
    {
        return $this->stocksLists()->create(array_merge([
            'display' => 'Lista de stock por defecto',
        ], $attributes));
    }

    /** Relationships */

    public function stocksLists(): MorphMany
    {
        return $this->morphMany(ReservableStockList::class, 'stockeable');
    }

}