<?php

namespace Hawk\Stock\Traits;

use Cake\Chronos\Chronos;
use Hawk\Stock\Models\ReservableStockList;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait HasReservableStockList
{

    /** Utils */

    public function setStockList($attributes)
    {
        $stockList = $this->stocksList()->create([
            'slug' => array_get($attributes, 'slug', 'default'),
            'start' => Chronos::parse(array_get($attributes, 'start'))->startOfDay()->toDateTimeString(),
            'end' => Chronos::parse(array_get($attributes, 'end'))->endOfDay()->toDateTimeString(),
        ]);

        if (array_get($attributes, 'stock') !== null) {
            $stockList->stocks()->create([
                'stock' => array_get($attributes, 'stock'),
                'allowsNegative' => array_get($attributes, 'allowsNegative', false),
            ]);
        }

        return $stockList;
    }

    /**
     * Determina si éste `ReservableStock` tiene stock durante un período de tiempo,
     * teniendo en cuenta las reservas hechas durante dicho período.
     *
     * @param string $slug
     * @param        $start
     * @param        $end
     *
     * @return bool
     */
    public function hasStock(string $slug, $start, $end)
    {
        $reservationsInPeriod = $this->reservationsInPeriod($start, $end);

        $stockList = $this->getStockList($slug, $start, $end);

        if (! $stockList || ! $stockList->stock) {
            // TODO: Loguear que no hay stock.
            return false;
        }

        if ($stockList->stock->allowsNegative === true) {
            return true;
        }

        return $stockList->stock->stock - $reservationsInPeriod > 0;
    }

    /**
     * Devuelve la instancia `ReservableStock` que predomina en un período de tiempo.
     * Si hay varias instancias en dicho período, se devuelve la última creada.
     *
     * @param string $slug
     * @param        $start
     * @param        $end
     *
     * @return mixed
     */
    public function getStockList(string $slug, $start, $end)
    {
        $start = Chronos::parse($start);
        $end = Chronos::parse($end);

        return ReservableStockList::query()
            ->with(['stock'])
            ->where('slug', '=', $slug)
            ->where('stockeable_type', '=', $this->getResourceType())
            ->where('stockeable_id', '=', $this->getId())
            ->where('reservableStocksLists.start', '<=', $start)
            ->where('reservableStocksLists.end', '>=', $end)
            ->orderBy('reservableStocksLists.end')
            ->orderByDesc('reservableStocksLists.id')
            ->first();
    }

    /** Relationships */

//    public function stocks(): MorphMany
//    {
//        return $this->morphMany(ReservableStock::class, 'stockeable')
//            ->orderByDesc('end');
//    }

    public function stocksList(): MorphMany
    {
        return $this->morphMany(ReservableStockList::class, 'stockeable')
            ->orderByDesc('end');
    }

}