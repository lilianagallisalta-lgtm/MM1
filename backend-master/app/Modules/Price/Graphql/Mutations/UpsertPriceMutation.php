<?php

namespace App\Modules\Price\Graphql\Mutations;

use Carbon\Carbon;
use Hawk\Price\Models\Price;
use Hawk\LighthouseExtended\Support\Mutations\HkMutation;

class UpsertPriceMutation extends HkMutation
{

    public function authorize()
    {
        return true;
    }

    protected function setRules()
    {
        if ($this->input('id')) {

        } else {
            $this->priceable = $this->findOrFailMorphed('priceable');

            $this->rules = collect([
                'price' => [
                    'required',
                    'numeric',
                ],
                'perDay' => [
                    'required',
                    'boolean',
                ],
            ]);

            switch ($this->priceable->priceType->slug) {
                case 'unique':
                    break;

                case 'multiple':
                    $this->rules->merge([
                        'from' => [
                            'required',
                            'date',
                        ],
                        'to' => [
                            'required',
                            'date',
                        ],
                    ]);

                    break;

                case 'through':
                    $this->merge([
                        'from' => Carbon::parse($this->input('from')),
                        'to' => Carbon::parse($this->input('to')),
                    ]);

                    $this->through = $this->findOrFailMorphed('through');

                    $exists = $this->priceable->prices($this->through)
                        ->where('from', '=', $this->input('from')->startOfDay())
                        ->where('to', '=', $this->input('to')->endOfDay())
                        ->first();

                    if ($exists) {
                        throw new \Exception('Ya hay un precio fijado en este rango de fecha');
                    }

                    break;
            }
        }
    }

    public function mutate(): Price
    {
        if ($this->input('id')) {
            $price = Price::findOrFail($this->input('id'));

            tap($price)->update(
                $this->only([
                    'price',
                    'perDay',
                ])
            );
        } else {
            $price = new Price();

            switch ($this->priceable->priceType->slug) {
                case 'unique':
                    $price->fill([
                        'price' => $this->input('price'),
                        'perDay' => $this->input('perDay'),
                    ]);

                    $price->priceable()->associate($this->priceable);
                    $price->priceType()->associate($this->priceable->priceType);

                    $price->save();

                    break;
            }
        }

        return $price;
    }

}