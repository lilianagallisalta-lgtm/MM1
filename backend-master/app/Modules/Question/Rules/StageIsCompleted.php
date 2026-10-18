<?php

namespace App\Modules\Question\Rules;

use App\Modules\Plan\Models\Plan;
use App\Modules\Question\Models\Question;
use Illuminate\Contracts\Validation\Rule;

class StageIsCompleted implements Rule
{

    protected $plan;

    public function __construct(Plan $plan)
    {
        $this->plan = $plan;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string $attribute
     * @param  mixed  $value
     *
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $questionsAnswered = $this->plan->answers()->pluck('question_id');
//        dump(Question::query()
//                ->where('ageRange_id', '=', $this->plan->ageRange->id)
//                ->where('stage_id', '=', $value)
//                ->whereNotIn('questions.id', $questionsAnswered)
//                ->count() == 0);
        return Question::query()
                ->where('ageRange_id', '=', $this->plan->ageRange->id)
                ->where('stage_id', '=', $value)
                ->whereNotIn('questions.id', $questionsAnswered)
                ->count() == 0;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return ___('Ya has finalizado esta etapa');
    }

}