<?php

namespace App\Modules\Question\Listeners;

use App\Modules\Question\Events\AnswerCreatedEvent;
use App\Modules\Question\Events\PlanCompletedEvent;
use App\Modules\Question\Events\StageCompletedEvent;
use App\Modules\Question\Models\Question;
use App\Modules\Question\Rules\StageIsCompleted;

class AnswerCreatedListener
{

    protected $answer;
    protected $plan;

    public function handle(AnswerCreatedEvent $event)
    {
        $this->answer = $event->answer;
        $this->plan = $event->answer->plan;

        if ((new StageIsCompleted($this->plan))->passes('stageId', $this->answer->question->stage_id)) {
            event(
                new StageCompletedEvent(
                    $this->answer->question->stage,
                    $this->plan
                )
            );
        }

        if ($this->checkIfPlanCompleted()) {
            event(new PlanCompletedEvent($this->plan));
        }
    }

    /**
     * Verifica si con esta respuesta se completó una etapa.
     * @return bool
     */
    private function checkIfStageCompleted(): bool
    {

    }

    /**
     * Verifica si con esta respuesta se completó el plan entero.
     * @return bool
     */
    private function checkIfPlanCompleted(): bool
    {
        $questionsAnswered = $this->plan->answers()->pluck('question_id');
        return Question::query()
                ->where('ageRange_id', '=', $this->plan->ageRange->id)
                ->whereNotIn('questions.id', $questionsAnswered)
                ->count() == 0;
    }

}