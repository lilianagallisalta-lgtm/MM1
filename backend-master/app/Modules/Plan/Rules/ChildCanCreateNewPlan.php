<?php

namespace App\Modules\Plan\Rules;

use App\Modules\Child\Models\Child;
use Illuminate\Contracts\Validation\Rule;

class ChildCanCreateNewPlan implements Rule
{

    /**
     * Sólo puede crearse un nuevo plan para un niño, si es que no tiene ninguno
     * incompleto y han pasado X segundos desde el último plan.
     *
     * @param  string $attribute
     * @param  mixed  $value
     *
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $child = Child::findOrFail($value);
        if ($child->plans()->uncompleted()->count() > 0) {
            return false;
        }
        $lastPlan = $child->plans()->orderByDesc('created_at')->first();
        return $lastPlan->created_at->diffInSeconds(now()) > config('plan.can_create_every_seconds');
    }

    /**
     * Get the validation error message.
     *
     * @return string|array
     */
    public function message()
    {
        return ___('Completa el plan anterior para crear uno nuevo');
    }

}