<?php

namespace App\Modules\Question\Events;

use App\Modules\Plan\Models\Plan;

class PlanCompletedEvent
{

    public $plan;

    public function __construct(Plan $plan)
    {
        $this->plan = $plan;
    }

}