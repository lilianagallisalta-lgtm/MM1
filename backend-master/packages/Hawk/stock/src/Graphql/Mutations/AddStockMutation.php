<?php

namespace Hawk\Stock\Graphql\Mutations;

use Hawk\LighthouseExtended\Support\Mutations\HkMutation;
use Hawk\Stock\Contracts\Stock;
use Hawk\Stock\Events\StockAdded;

class AddStockMutation extends HkMutation
{


    public function authorize()
    {
        return optional(me())->hasRole('admin');
    }

    protected function setRules()
    {
        $this->rules = [
            'stockeableType' => [
                'required',
            ],
            'stockeableId' => [
                'required',
            ],
            'amount' => [
                'required',
                'min:0',
            ],
        ];
    }

    public function mutate(): Stock
    {
        $stockeable = $this->findOrFailMorphed('stockeable');
        event(new StockAdded(
            $stockeable->stock->id,
            $this->input('amount')
        ));
        return $stockeable->stock()->first();
    }

}