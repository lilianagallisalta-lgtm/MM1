<?php

namespace App\Modules\Question\Listeners;

use App\Modules\Question\Events\PlanCompletedEvent;
use App\Modules\Question\Events\StageCompletedEvent;

class PlanCompletedListener
{

    protected $plan;

    /**
     * @param StageCompletedEvent $event
     */
    public function handle(PlanCompletedEvent $event)
    {
        $this->plan = $event->plan;
        $this->plan->completed_at = now();
        $this->plan->save();

        $child = $this->plan->child;
    }

}