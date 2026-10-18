<?php

namespace Hawk\PromotionCode;

use Hawk\PromotionCode\Models\PromotionCode;
use Hawk\Support\Providers\HkModuleServiceProvider;

class PromotionCodeServiceProvider extends HkModuleServiceProvider
{

    protected $name = 'promotionCode';

    protected $models = [
        PromotionCode::class,
    ];

    protected $morphMap = [
        'promotionCodes' => PromotionCode::class,
    ];

}
