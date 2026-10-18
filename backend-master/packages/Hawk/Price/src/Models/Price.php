<?php

namespace Hawk\Price\Models;

use Hawk\Support\Database\Eloquent\HkModel;
use Hawk\Support\Database\Eloquent\Traits\HasSchemalessAttributes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Price extends HkModel
{
    use HasSchemalessAttributes;

    static $resourceType = 'prices';
    protected $table = 'prices';

    protected $fillable = [
        'price',
        'perDay',
        'extra_attributes',
    ];

    protected $casts = [
        'extra_attributes' => 'array',
    ];

    protected $attributes = [
        'perDay' => false,
        'extra_attributes' => '{}',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    /** Accessors */

    /**
     * El total debe ser seteado en ésta instancia, sino devuelve el precio.
     * @return mixed
     */
    public function getTotalAttribute()
    {
        return array_get($this->attributes, 'total', array_get($this->attributes, 'price'));
    }

    /** Relationships */

    public function priceable(): MorphTo
    {
        return $this->morphTo('priceable');
    }

    public function priceType(): BelongsTo
    {
        return $this->belongsTo(PriceType::class, 'priceType_id');
    }
}
