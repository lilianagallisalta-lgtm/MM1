<?php

namespace Hawk\Stock\Events;

use Spatie\EventProjector\ShouldBeStored;

class StockAdded implements ShouldBeStored
{

    public $stockId;
    public $amount;

    public function __construct($stockId, int $amount)
    {
        $this->stockId = $stockId;
        $this->amount = $amount;
    }

}