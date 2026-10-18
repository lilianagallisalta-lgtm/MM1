<?php

namespace Hawk\Price\Traits;

use Hawk\Price\Models\Price;
use Hawk\Price\Models\PriceType;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

trait HasPrices
{

    static public $perDay = true;

    /**
     * Devuelve el `Price` actual (según `from` y `to`).
     */
    public function getPrice($day = null)
    {
        switch ($this->priceType->slug) {
            case 'unique':
                return Price::where(function ($query) {
                        $query->where('priceable_type', '=', $this->getResourceType())
                            ->where('priceable_id', '=', $this->id);
                    })
                    ->where('priceType_id', '=', $this->priceType->id)
                    ->latest()
                    ->orderBy('id', 'desc')
                    ->first();

                break;
        }
    }

    /**
     * Setea el `PriceType` actual.
     *
     * @param $priceTypeIdOrSlug
     *
     * @return
     */
    public function setPriceType($priceTypeIdOrSlug)
    {
        $this->priceType()->attach(PriceType::findByIdOrSlugOrFail($priceTypeIdOrSlug)->id, [
            'priceable_type' => $this->getResourceType(),
        ]);

        return $this->save();
    }

    /** Relationships */

    public function prices(): MorphMany
    {
        return $this->morphMany(Price::class, 'priceable')
            ->orderBy('to', 'desc');
    }

    public function price(): MorphOne
    {
        switch ($this->priceType->slug) {
            case 'unique':
                return $this->morphOne(Price::class, 'priceable')
                    ->where(function ($query) {
                        $query->where('priceable_type', '=', $this->getResourceType())
                            ->where('priceable_id', '=', $this->id);
                    })
                    ->where('priceType_id', '=', $this->priceType->id)
                    ->latest()
                    ->orderBy('id', 'desc');

                break;
        }
    }

    public function priceType()
    {
        return $this->belongsToMany(PriceType::class, 'priceable_priceType', 'priceable_id', 'priceType_id')
            ->where('priceable_type', '=', $this->getResourceType())
            ->expectOne();
    }

}