<?php

namespace Hawk\Stock;

use Hawk\Stock\Models\ReservableStock;
use Hawk\Stock\Models\ReservableStockList;
use Hawk\Stock\Models\Stock;
use Hawk\Stock\Projectors\StockProjector;
use Hawk\Support\Providers\HkModuleServiceProvider;

class StockServiceProvider extends HkModuleServiceProvider
{

    protected $name = 'stock';

    protected $models = [
        Stock::class,
        ReservableStock::class,
        ReservableStockList::class,
    ];

    protected $morphMap = [
        'stocks' => Stock::class,
        'reservableStocks' => ReservableStock::class,
        'reservableStocksLists' => ReservableStockList::class,
    ];

    public function boot()
    {
        parent::boot();

        \Spatie\EventProjector\Facades\Projectionist::addProjector(StockProjector::class);
    }

}
