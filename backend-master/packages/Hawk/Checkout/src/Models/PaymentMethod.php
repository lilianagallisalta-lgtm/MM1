<?php

namespace Hawk\Checkout\Models;

use Hawk\Support\Database\Eloquent\HkModel;
use Hawk\Support\Database\Eloquent\Traits\HasSlugAsIdentifier;
use Spatie\Translatable\HasTranslations;

class PaymentMethod extends HkModel
{

    use HasSlugAsIdentifier,
        HasTranslations;

    static $resourceType = 'paymentMethods';
    protected $table = 'paymentMethods';

    protected $fillable = [
        'slug',
        'name',
        'description',
        'picture',
        'charge',
    ];

    protected $casts = [];

    protected $attributes = [];

    public $translatable = [
        'name',
        'description',
    ];

}
