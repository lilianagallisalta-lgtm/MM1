<?php

namespace App\Modules\Question\Events;

use App\Modules\Plan\Models\Plan;
use App\Modules\Stage\Models\Stage;

class StageCompletedEvent
{

    public $stage;
    public $plan;

    public function __construct(Stage $stage, Plan $plan)
    {
        $this->stage = $stage;
        $this->plan = $plan;
    }

}