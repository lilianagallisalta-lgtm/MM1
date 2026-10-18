<?php

namespace Hawk\Stock\Events;

use Spatie\EventProjector\ShouldBeStored;

class StockeableCreated implements ShouldBeStored
{

    public $stockeableType;
    public $stockeableId;
    public $initialStock;

    public function __construct(string $stockeableType, string $stockeableId, int $initialStock)
    {
        $this->stockeableType = $stockeableType;
        $this->stockeableId = $stockeableId;
        $this->initialStock = $initialStock;
    }

}