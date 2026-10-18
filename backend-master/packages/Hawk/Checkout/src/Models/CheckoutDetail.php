<?php

namespace Hawk\Checkout\Models;

use Hawk\Support\Database\Eloquent\HkModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Spatie\Translatable\HasTranslations;

class CheckoutDetail extends HkModel
{

    use HasTranslations;

    static $resourceType = 'checkoutsDetails';
    protected $table = 'checkoutsDetails';

    protected $fillable = [
        'checkable_type',
        'checkable_id',
        'description',
        'price',
        'checkout_id',
    ];

    protected $casts = [];

    protected $attributes = [];

    public $translatable = [
        'description',
    ];

    /** Relationships */

    public function checkable(): MorphTo
    {
        return $this->morphTo('checkable');
    }

    public function checkout(): BelongsTo
    {
        return $this->belongsTo(Checkout::class);
    }

}
