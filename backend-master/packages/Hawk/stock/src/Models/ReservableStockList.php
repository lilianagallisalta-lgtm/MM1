<?php

namespace Hawk\Stock\Models;

use Hawk\Stock\Traits\HasTeservableStocks;
use Hawk\Support\Database\Eloquent\HkModel;
use Hawk\Support\Database\Eloquent\Traits\HasSchemalessAttributes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Translatable\HasTranslations;

class ReservableStockList extends HkModel implements \Hawk\Stock\Contracts\ReservableStockList
{

    use HasTeservableStocks,
        SoftDeletes,
        HasTranslations,
        HasSchemalessAttributes;

    public static $resourceType = 'reservableStocksLists';
    protected $table = 'reservableStocksLists';

    protected $fillable = [
        'slug',
        'display',
        'stockeable_type',
        'stockeable_id',
    ];

    protected $casts = [
        'extra_attributes' => 'array',
    ];

    protected $attributes = [
        'slug' => 'default',
        'extra_attributes' => '{}',
    ];

    public $translatable = [
        'display',
    ];

    /** Scopes */

    public function scopeDefault(Builder $builder)
    {
        return $builder->where('slug', '=', 'default');
    }

    public function scopeByTaxon(Builder $builder, HkModel $taxon)
    {
        return $builder->whereHas('taxons', function ($query) use ($taxon) {
            $query->where('taxon_type', '=', $taxon->getResourceType())
                ->where('taxon_id', '=', $taxon->getId());
        });
    }

    /** Issers */

    /**
     * Indica si éste `ReservableStockList` es el activo para el `Stockeable` en
     * un determinado momento.
     *
     * @param string $datetime
     *
     * @return bool
     */
    public function isActive($datetime = 'now')
    {
        // TODO
//        $datetime = Chronos::parse($datetime);
//        return $this->id == $this->stockeable->getStockList($this->slug, $datetime, $datetime->addDay())->id;
    }

    /** Relationships */

    public function taxons(): HasMany
    {
        return $this->hasMany(ReservableStockListTaxon::class, 'reservableStockList_id');
    }

    public function stocks(): HasMany
    {
        return $this->hasMany(ReservableStock::class, 'reservableStockList_id');
    }

    public function stockeable(): MorphTo
    {
        return $this->morphTo('stockeable');
    }

    /** Utils */

    public function addTaxon(HkModel $taxon)
    {
        $this->taxons()->create([
            'taxon_type' => $taxon->getResourceType(),
            'taxon_id' => $taxon->getId(),
        ]);
        return $this;
    }

}
