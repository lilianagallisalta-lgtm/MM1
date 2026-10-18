<?php

namespace App\Modules\Question\Rules;

use App\Modules\Plan\Models\Plan;
use App\Modules\Question\Models\Answer;
use Illuminate\Contracts\Validation\Rule;

class QuestionIsAnswered implements Rule
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
        return Answer::query()
            ->where('plan_id', '=', $this->plan->id)
            ->where('question_id', '=', $value)
            ->exists();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return ___('Ya has contestado esta pregunta');
    }

}