<?php

namespace Hawk\Stock\Traits;

use Hawk\Stock\Models\ReservableStock;
use Illuminate\Database\Eloquent\Relations\HasOne;

trait HasReservableStock
{

    /** Utils */

    public function getStock(): \Hawk\Stock\Contracts\ReservableStock
    {
        return $this->stock;
    }

    public function setStock($attributes)
    {
        if ($this->stock()->count()) {
            $this->stock()->delete();
        }

        return ReservableStock::create([
            'stock' => array_get($attributes, 'stock'),
            'allowsNegative' => array_get($attributes, 'allowsNegative', false),
            'stockeable_type' => $this->getResourceType(),
            'stockeable_id' => $this->getId(),
        ]);
    }

    /** Relationships */

    public function stock(): HasOne
    {
        return $this->hasOne(ReservableStock::class, 'stockeable_id', 'id')
            ->where('reservableStocks.stockeable_type', '=', $this->getResourceType());
    }

}