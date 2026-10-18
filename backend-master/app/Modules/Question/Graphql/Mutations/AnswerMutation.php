<?php

namespace App\Modules\Question\Graphql\Mutations;

use App\Modules\Plan\Models\Plan;
use App\Modules\Plan\Rules\UserOwnsPlan;
use App\Modules\Question\Graphql\Queries\NextQuestionQuery;
use App\Modules\Question\Models\Answer;
use App\Modules\Question\Models\AnswerOption;
use App\Modules\Question\Models\Question;
use App\Modules\Question\Rules\StageIsCompleted;
use App\Modules\Stage\Rules\StageIsAvailableForChild;
use Hawk\LighthouseExtended\Support\Mutations\HkMutation;

class AnswerMutation extends HkMutation
{

    protected $me;
    protected $plan;
    protected $question;
    protected $stage;
    protected $answer;

    public function authorize(): bool
    {
        $this->me = me();
        return $this->me != null;
    }

    public function setRules(): void
    {
        $this->rules = [
            'planId' => [
                'required',
//                'exists:plans,id',
            ],
            'questionId' => [
                'required',
                'exists:questions,id',
            ],
            'answerOptionId' => [
                'required',
                'exists:answerOptions,id',
            ],
        ];
    }

    public function moreValidation()
    {
        $this->plan = Plan::whereUuid($this->input('planId'))->first();

        $this->question = Question::query()
            ->with(['stage'])
            ->findOrFail($this->input('questionId'));

        $this->stage = $this->question->stage;

        if (! (new UserOwnsPlan(me()))->passes('planId', $this->plan->id)) {
            $this->addError('planId', 'exists', ___('Plan no encontrado'));
        }

        if (! (new StageIsAvailableForChild($this->plan->child))->passes('stageId', $this->stage->id)) {
            $this->addError('license', 'exists', ___('No tienes una licencia activa'));
        }

        if ((new StageIsCompleted($this->plan))->passes('stageId', $this->stage->id)) {
            $this->addError('stage', 'completed', ___('Ya has finalizado esta etapa'));
    }
    }

    public function mutate(): Answer
    {
//        while ($question = $this->getNextQuestion()) {
            $this->answer = Answer::firstOrNew([
                'user_id' => $this->me->id,
                'plan_id' => $this->plan->id,
//                'question_id' => $question->id,
                'question_id' => $this->question->id,
            ]);
//            $this->answer->answerOption_id = AnswerOption::inRandomOrder()->first()->id;
            $this->answer->answerOption_id = $this->input('answerOptionId');
            $this->answer->save();
//        }

        return $this->answer;
    }

    private function getNextQuestion()
    {
        return (new NextQuestionQuery())->handle(null, [
            'planId' => $this->plan->uuid,
            'stageId' => $this->stage->id,
        ]);
    }

}