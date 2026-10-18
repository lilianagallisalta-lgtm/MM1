<?php

namespace App\Modules\Stage;

use App\Modules\Stage\Models\Stage;
//use App\Modules\Stage\Models\StagePurchase;
use Hawk\Support\Providers\HkModuleServiceProvider;

class StageModuleServiceProvider extends HkModuleServiceProvider
{

    protected $name = 'stage';

    protected $morphMap = [
        'stages' => Stage::class,
//        'stagesPurchases' => StagePurchase::class,
    ];

    protected $registerConfig = false;

}