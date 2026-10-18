<?php

namespace Hawk\Stock\Models;

use Hawk\Support\Database\Eloquent\HkModel;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class ReservableStockListTaxon extends HkModel
{

    public static $resourceType = 'reservableStocksListsTaxons';
    protected $table = 'reservableStockList_taxon';

    protected $fillable = [
        'reservableStockList_id',
        'taxon_type',
        'taxon_id',
    ];

    /** Relationships */

    public function taxon(): MorphTo
    {
        return $this->morphTo('taxon');
    }

}
