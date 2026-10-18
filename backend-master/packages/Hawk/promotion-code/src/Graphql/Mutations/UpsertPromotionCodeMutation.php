<?php

namespace Hawk\PromotionCode\Graphql\Mutations;

use Hawk\PromotionCode\Models\PromotionCode;
use Cake\Chronos\Chronos;
use Hawk\LighthouseExtended\Support\Mutations\HkMutation;
use Hawk\PromotionCode\Repositories\PromotionCodeRepository;

class UpsertPromotionCodeMutation extends HkMutation
{

    public function authorize()
    {
        return true;
    }

    protected function setRules()
    {
        $this->merge([
            'start' => Chronos::parse($this->input('start'))->startOfDay(),
            'end' => Chronos::parse($this->input('end'))->endOfDay(),
        ]);

        $this->rules = [
            'code' => [
                'required',
                'unique:promotionCodes,code',
                'alpha_dash',
            ],
            'percentage' => [
                'required_without:percentageDisplay',
                'numeric',
                'min:0',
                'max:1',
            ],
            'percentageDisplay' => [
                'numeric',
                'min:0',
                'max:100',
            ],
            'start' => [
                'required',
                'date',
            ],
            'end' => [
                'required',
                'date',
                'after:start',
            ],
        ];

        if ($this->isCreating()) {
            $this->mergeRules([
                'initialStock' => [
                    'required',
                    'numeric',
                    'min:1',
                ],
            ]);
        }
    }

    public function mutate() : PromotionCode
    {
//        return app(PromotionCodeRepository::class)->updateOrCreate(
//            ['id' => $this->input('id')],
//            [
//                'code' => $this->input('code'),
//                'percentage' => - ($this->input('percentage') ?? $this->input('percentageDisplay') / 100),
//                'start' => $this->input('start')->toDateTimeString(),
//                'end' => $this->input('end')->toDateTimeString(),
//                'initialStock' => $this->input('initialStock'),
//            ]
//        );

        $attributes = [
            'code' => strtoupper($this->input('code')),
            'percentage' => $this->input('percentage') ?? $this->input('percentageDisplay') / 100,
            'start' => $this->input('start')->toDateTimeString(),
            'end' => $this->input('end')->toDateTimeString(),
            'initialStock' => $this->input('initialStock'),
        ];

        if ($this->isCreating()) {
            return app(PromotionCodeRepository::class)->create($attributes);
        } else {
            return app(PromotionCodeRepository::class)->update($attributes, $this->input('id'));
        }
    }
}
