<?php

namespace App\Modules\Child\Rules;

use App\Modules\Child\Models\Child;
use Illuminate\Contracts\Validation\Rule;

class ChildHasActiveLicense implements Rule
{

    /**
     * Determina si el niño tiene una licencia activa.
     *
     * @param  string $attribute
     * @param  mixed  $value
     *
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return Child::findOrFail($value)->licenses()->active()->count() > 0;
    }

    /**
     * Get the validation error message.
     *
     * @return string|array
     */
    public function message()
    {
        return ___('No tienes una licencia activa');
    }

}