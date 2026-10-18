<?php

namespace App\Modules\Child\Listeners;

use App\Modules\Child\Events\ChildCreatedEvent;

class ChildCreatedListener
{

    public function handle(ChildCreatedEvent $event)
    {
        $event->child->plans()->create([
            'idx' => $event->child->plans()->count() + 1,
            'ageRange_id' => $event->child->ageRange_id,
        ]);
    }

}