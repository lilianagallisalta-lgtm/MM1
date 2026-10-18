<?php

namespace Hawk\Stock\Traits;

use Hawk\Stock\Models\Stock;
use Illuminate\Database\Eloquent\Relations\MorphOne;

trait HasStock
{

    /** Relationships */

    public function stock(): MorphOne
    {
        return $this->morphOne(Stock::class, 'stockeable');
    }

}