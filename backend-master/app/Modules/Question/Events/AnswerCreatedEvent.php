<?php

namespace App\Modules\Question\Events;

use App\Modules\Question\Models\Answer;

class AnswerCreatedEvent
{

    public $answer;

    public function __construct(Answer $answer)
    {
        $this->answer = $answer;
    }

}