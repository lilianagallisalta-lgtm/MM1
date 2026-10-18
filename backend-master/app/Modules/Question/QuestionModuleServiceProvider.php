<?php

namespace App\Modules\Question;

use App\Modules\Question\Events\AnswerCreatedEvent;
use App\Modules\Question\Events\PlanCompletedEvent;
use App\Modules\Question\Events\StageCompletedEvent;
use App\Modules\Question\Listeners\AnswerCreatedListener;
use App\Modules\Question\Listeners\PlanCompletedListener;
use App\Modules\Question\Listeners\StageCompletedListener;
use Hawk\Support\Providers\HkModuleServiceProvider;

class QuestionModuleServiceProvider extends HkModuleServiceProvider
{

    protected $name = 'question';

    protected $registerConfig = false;

    protected $listen = [
        AnswerCreatedEvent::class => [
            AnswerCreatedListener::class,
        ],

        StageCompletedEvent::class => [
            StageCompletedListener::class,
        ],

        PlanCompletedEvent::class => [
            PlanCompletedListener::class,
        ],
    ];

}