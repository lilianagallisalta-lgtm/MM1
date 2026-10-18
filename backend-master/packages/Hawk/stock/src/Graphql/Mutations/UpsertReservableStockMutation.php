<?php

namespace Hawk\Stock\Graphql\Mutations;

use Cake\Chronos\Chronos;
use Hawk\LighthouseExtended\Support\Mutations\HkMutation;
use Hawk\Stock\Models\ReservableStock;
use Hawk\Stock\Models\ReservableStockList;

class UpsertReservableStockMutation extends HkMutation
{

    public function authorize()
    {
        return optional(me())->hasRole('admin');
    }

    protected function setRules()
    {
        $this->rules = collect([
            'stock' => [
                'required',
                'numeric',
            ],
            'allowsNegative' => [
                'boolean',
            ],
            'start' => [
                'required',
                'date',
            ],
            'end' => [
                'required',
                'date',
            ],
        ]);

        if ($this->isCreating()) {
            $this->mergeRules([
                'reservableStockListId' => [
                    'required',
                    'exists:reservableStocksLists,id',
                ],
            ]);
        }
    }

    public function mutate(): ReservableStock
    {
        if ($this->isCreating()) {
            $reservableStockList = ReservableStockList::findOrFail($this->input('reservableStockListId'));
            $reservableStock = $reservableStockList->createStock([
                'stock' => $this->input('stock'),
                'allowsNegative' => $this->input('allowsNegative', false),
                'start' => $this->input('start'),
                'end' => $this->input('end'),
            ]);
        } else {
            $reservableStock = ReservableStock::findOrFail($this->input('id'));
            tap($reservableStock)->update([
                'stock' => $this->input('stock'),
                'allowsNegative' => $this->input('allowsNegative', $reservableStock->allowsNegative),
                'start' => $this->input('start') ? Chronos::parse($this->input('start'))->startOfDay() : $reservableStock->start,
                'end' => $this->input('end') ? Chronos::parse($this->input('end'))->endOfDay() : $reservableStock->end,
            ]);
        }

        return $reservableStock;
    }

}