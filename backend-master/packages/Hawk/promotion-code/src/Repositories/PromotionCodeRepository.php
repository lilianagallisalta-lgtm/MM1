<?php

namespace Hawk\PromotionCode\Repositories;

use Cake\Chronos\Chronos;
use Hawk\PromotionCode\Models\PromotionCode;
use Hawk\Stock\Events\StockeableCreated;
use Prettus\Repository\Eloquent\BaseRepository;

class PromotionCodeRepository extends BaseRepository
{

    public function model()
    {
        return PromotionCode::class;
    }

    public function create(array $attributes): PromotionCode
    {
        $promotionCode = parent::create(
            array_merge(
                ['deleted_at' => Chronos::parse(array_get($attributes, 'end'))->endOfDay()->toDateTimeString()],
                [
                    'code' => strtoupper(array_get($attributes, 'code')),
                    'percentage' => - ( array_get($attributes, 'percentage') ?? (array_get($attributes, 'percentageDisplay') / 100) ),
                    'start' => Chronos::parse(array_get($attributes, 'start'))->startOfDay()->toDateTimeString(),
                    'end' => Chronos::parse(array_get($attributes, 'end'))->endOfDay()->toDateTimeString(),
                ]
            )
        );

        event(
            new StockeableCreated('promotionCodes', $promotionCode->id, array_get($attributes, 'initialStock'))
        );
//        $promotionCode->stock()->create([
//            'currentStock' => array_get($attributes, 'initialStock'),
//        ]);

        return $promotionCode;
    }

    public function update(array $attributes, $id)
    {
        return parent::update(
            array_merge(
                ['deleted_at' => Chronos::parse(array_get($attributes, 'end'))->endOfDay()],
                [
                    'code' => array_get($attributes, 'code'),
                    'percentage' => - ( array_get($attributes, 'percentage') ?? (array_get($attributes, 'percentageDisplay') / 100) ),
                    'start' => Chronos::parse(array_get($attributes, 'start'))->startOfDay()->toDateTimeString(),
                    'end' => Chronos::parse(array_get($attributes, 'end'))->endOfDay()->toDateTimeString(),
                ]
            ),
            $id
        );
    }

}