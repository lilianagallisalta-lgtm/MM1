<?php

namespace Hawk\Price\Models;

use Hawk\Support\Database\Eloquent\HkModel;
use Hawk\Support\Database\Eloquent\Traits\HasSlugAsIdentifier;
use Spatie\Translatable\HasTranslations;

class PriceType extends HkModel
{
    use HasSlugAsIdentifier,
        HasTranslations;

    static $resourceType = 'pricesTypes';
    protected $table = 'pricesTypes';

    static $availableIncludes = [
    ];

    protected $fillable = [
        'type',
        'name',
    ];

    protected $casts = [];

    protected $attributes = [];

    public $translatable = [
        'name',
    ];
}
