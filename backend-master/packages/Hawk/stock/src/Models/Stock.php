<?php

namespace Hawk\Stock\Models;

use Hawk\Support\Database\Eloquent\HkModel;

class Stock extends HkModel implements \Hawk\Stock\Contracts\Stock
{

    public static $resourceType = 'stocks';
    protected $table = 'stocks';

    protected $fillable = [
        'currentStock',
        'stockHaveLeft',
        'allowsNegative',
        'stockeable_type',
        'stockeable_id',
    ];

    protected $casts = [];

    protected $attributes = [
        'allowsNegative' => false,
    ];

    /** Accessors */

    // ...

    /** Scopes */

    // ...

    /** Relationships */

    // ...

}
