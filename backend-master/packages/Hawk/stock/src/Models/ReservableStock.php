<?php

namespace Hawk\Stock\Models;

use Cake\Chronos\Chronos;
use Hawk\Support\Database\Eloquent\HkModel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReservableStock extends HkModel implements \Hawk\Stock\Contracts\ReservableStock
{

    public static $resourceType = 'reservableStocks';
    protected $table = 'reservableStocks';

    protected $fillable = [
        'stock',
        'allowsNegative',
        'start',
        'end',
        'reservableStockList_id',
    ];

    protected $casts = [
        'allowsNegative' => 'bool',
    ];

    protected $attributes = [
        'allowsNegative' => false,
    ];

    /** Issers */

    /**
     * Indica si, de entre todos, éste `Price` es el activo para un determinado día.
     * momento.
     * @param string $datetime
     *
     * @return bool
     */
    public function isActive($datetime = 'now')
    {
        $datetime = Chronos::parse($datetime);
        return $this->id == optional($this->stockList->stocks()->activedAtDay($datetime)->first())->id;
//        return $this->id == $this->priceable->getPriceList($this->slug, $datetime)->id;
    }

    /**
     * Indica si, de entre todos, éste `Price` es el por defecto para un determinado día.
     * momento.
     * @param string $datetime
     *
     * @return bool
     */
    public function isDefault($datetime = 'now')
    {
        $datetime = Chronos::parse($datetime);
        return $this->id == optional($this->stockList->stocks()->oldestAtDay($datetime)->first())->id;
//        return $this->id == $this->priceable->getPriceList($this->slug, $datetime)->id;
    }

    /** Scopes */

    public function scopeActivedAtDay(Builder $builder, $date = 'today')
    {
        $date = Chronos::parse($date);
        return $builder
            ->where([
                ['reservableStocks.start', '<=', $date->startOfDay()->toDateTimeString()],
                ['reservableStocks.end', '>=', $date->endOfDay()->toDateTimeString()],
            ])
            ->orderByDesc('reservableStocks.start')
            ->orderByDesc('reservableStocks.created_at');
    }

    public function scopeOldestAtDay(Builder $builder, $date = 'today')
    {
        $date = Chronos::parse($date);
        return $builder
            ->where([
                ['reservableStocks.start', '<=', $date->startOfDay()->toDateTimeString()],
                ['reservableStocks.end', '>=', $date->endOfDay()->toDateTimeString()],
            ])
            ->orderBy('reservableStocks.start')
            ->orderBy('reservableStocks.created_at');
    }

    /** Relationships */

    public function stockList(): BelongsTo
    {
        return $this->belongsTo(ReservableStockList::class, 'reservableStockList_id');
    }

}
