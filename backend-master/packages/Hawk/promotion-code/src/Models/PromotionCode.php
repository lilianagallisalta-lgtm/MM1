<?php

namespace Hawk\PromotionCode\Models;

use Cake\Chronos\Chronos;
use Hawk\Cart\Contracts\Buyable;
use Hawk\Price\Contracts\Priceable;
use Hawk\Stock\Contracts\Stockeable;
use Hawk\Stock\Traits\HasStock;
use Hawk\Support\Database\Eloquent\HkModel;
use Hawk\Support\Database\Eloquent\Traits\FutureSoftDeletes;
use Illuminate\Database\Eloquent\Builder;

class PromotionCode extends HkModel implements \Hawk\PromotionCode\Contracts\PromotionCode, Stockeable
{

    use FutureSoftDeletes,
        HasStock;

    public static $resourceType = 'promotionCodes';
    protected $table = 'promotionCodes';

    protected $fillable = [
        'code',
        'percentage',
        'start',
        'end',
        'deleted_at',
    ];

    protected $casts = [];

    protected $attributes = [];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
        'start',
        'end',
    ];

    /** Issers */

    public function isValid(): bool
    {
        return $this->start->lte(now())
            && $this->end->gte(now())
            && $this->stock->currentStock > 0;
    }

    /** Accessors */

    public function getPercentageDisplayAttribute(): string
    {
        return array_get($this->attributes, 'percentage') * 100 . '%';
    }

    /** Scopes */

    public function scopeOnlyActives(Builder $builder, $date = 'now')
    {
        $date = Chronos::parse($date);

        return $builder
            ->where('start', '<=', $date->toDateTimeString())
            ->where('end', '>=', $date->toDateTimeString())
            ->whereHas('stock', function ($query) {
                return $query->where('stocks.currentStock', '>', 0);
            });
    }

    /** Relationships */

    // ...

}
