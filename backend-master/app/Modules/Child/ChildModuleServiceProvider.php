<?php

namespace App\Modules\Child;

use App\Modules\Child\Events\   ChildCreatedEvent;
use App\Modules\Child\Listeners\ChildCreatedListener;
use Hawk\Support\Providers\HkModuleServiceProvider;

class ChildModuleServiceProvider extends HkModuleServiceProvider
{

    protected $name = 'child';

    protected $registerConfig = false;

    protected $listen = [
        ChildCreatedEvent::class => [
            ChildCreatedListener::class,
        ],
    ];

}