<?php

namespace Hawk\Stock\Traits;

use Cake\Chronos\Chronos;
use Hawk\Stock\Models\ReservableStock;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Arr;

trait HasTeservableStocks
{

    /** Utils */

    public function createStock(array $attributes)
    {
        $attributes = array_merge($attributes, [
            'start' => Arr::get($attributes, 'start', Chronos::now()->startOfCentury()),
            'end' => Arr::get($attributes, 'end', Chronos::now()->endOfCentury()),
        ]);

        return $this->stocks()->create([
            'stock' => Arr::get($attributes, 'stock'),
            'allowsNegative' => Arr::get($attributes, 'allowsNegative', false),
            'start' => Chronos::parse(Arr::get($attributes, 'start'))->startOfDay(),
            'end' => Chronos::parse(Arr::get($attributes, 'end'))->endOfDay(),
        ]);
    }

    /**
     * Determina si cuenta con stock desde `$start` durante `$days` días.
     *
     * @param        $start
     * @param int    $days
     * @param string $slug
     *
     * @return float
     * @throws NoPriceException
     * @throws \Throwable
     */
    public function hasStock($start, $end = null): bool
    {
        $start = Chronos::parse($start);
        $end = $end ?? $start->addDay();
        $current = $start;
        $hasStock = true;
        while ($current->lt($end) && $hasStock === true) {
            $reservations = $this->stockeable->reservationsAtDay($current);
            $stockInstance = $this->stocks()->activedAtDay($current)->first();
            if (! $stockInstance) {
                \Log::warning("stockeable[{$this->getResourceType()}][{$this->getId()}] has no reservableStock at {$current}");
                $hasStock = false;
                continue;
            }
            if ($reservations >= $stockInstance->stock && $stockInstance->allowsNegative == false) {
                $hasStock = false;
                continue;
            }
            $current = $current->addDay();
        }
        return $hasStock;
    }

    /** Relationships */

    public function stocks(): HasMany
    {
        return $this->hasMany(ReservableStock::class, 'reservableStockList_id');
    }

    public function stockeable(): MorphTo
    {
        return $this->morphTo('stockeable');
    }

}