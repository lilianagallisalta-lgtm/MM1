<?php

namespace Hawk\Stock\Projectors;

use Hawk\PromotionCode\Models\PromotionCode;
use Hawk\Stock\Events\StockAdded;
use Hawk\Stock\Events\StockeableCreated;
use Hawk\Stock\Events\StockSubsctracted;
use Hawk\Stock\Models\Stock;
use Illuminate\Database\Eloquent\Relations\Relation;
use Spatie\EventProjector\Projectors\Projector;
use Spatie\EventProjector\Projectors\ProjectsEvents;

class StockProjector implements Projector
{

    use ProjectsEvents;

    public $handlesEvents = [
        StockeableCreated::class => 'onStockeableCreated',
        StockAdded::class => 'onStockAdded',
        StockSubsctracted::class => 'onStockSubstracted',
    ];

    public function onStockeableCreated(StockeableCreated $event)
    {
        $stockeable = (Relation::getMorphedModel($event->stockeableType))::withTrashed()->findOrFail($event->stockeableId);
        $stockeable->stock()->create([
            'currentStock' => $event->initialStock,
            'stockHaveLeft' => 0,
        ]);
    }

    public function onStockAdded(StockAdded $event)
    {
        $stock = Stock::findOrFail($event->stockId);
        $stock->currentStock += $event->amount;
        $stock->save();
    }

    public function onStockSubstracted(StockSubsctracted $event)
    {
        $stock = Stock::findOrFail($event->stockId);
        $stock->currentStock -= $event->amount;
        $stock->stockHaveLeft += $event->amount;
        $stock->save();
    }

}