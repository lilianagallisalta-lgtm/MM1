<?php

namespace Hawk\Stock\Graphql\Mutations;

use Hawk\LighthouseExtended\Support\Mutations\HkMutation;
use Hawk\Stock\Models\ReservableStock;

class DeleteReservableStockMutation extends HkMutation
{

    protected $reservableStock;

    public function authorize()
    {
        return optional(me())->hasRole('admin');
    }

    protected function setRules()
    {
        $this->rules = [
            'id' => [
                'required',
                'exists:reservableStocks,id',
            ],
        ];
    }

    public function moreValidation()
    {
        $this->reservableStock = ReservableStock::findOrFail($this->input('id'));

        // TODO:
        //        if ($this->reservableStock->isDefault) {
//            $this->addError(
//                'id',
//                'error',
//                'No puedes eliminar el stock base'
//            );
//        }
    }

    public function mutate(): bool
    {
        return $this->reservableStock->delete();
    }

}