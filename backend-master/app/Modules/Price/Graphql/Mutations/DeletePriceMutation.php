<?php

namespace App\Modules\Price\Graphql\Mutations;

use Hawk\Price\Models\Price;
use Hawk\LighthouseExtended\Support\Mutations\HkMutation;

class DeletePriceMutation extends HkMutation
{

    public function authorize()
    {
        return true;
    }

    protected function setRules()
    {
        $this->rules = [
            'id' => [
                'required',
                'exists:prices,id',
            ],
        ];
    }

    public function mutate(): bool
    {
        $price = Price::findOrFail($this->input('id'));

        return $price->delete();
    }
}