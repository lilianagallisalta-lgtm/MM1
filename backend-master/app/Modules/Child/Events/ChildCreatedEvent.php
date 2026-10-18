<?php

namespace App\Modules\Child\Events;

use App\Modules\Child\Models\Child;
use Illuminate\Queue\SerializesModels;

class ChildCreatedEvent
{

    use SerializesModels;

    public $child;

    public function __construct(Child $child)
    {
        $this->child = $child;
    }


}