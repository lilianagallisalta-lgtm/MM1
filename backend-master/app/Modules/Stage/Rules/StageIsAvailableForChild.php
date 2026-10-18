<?php

namespace App\Modules\Stage\Rules;

use App\Modules\Child\Models\Child;
use App\Modules\Stage\Models\Stage;
use Illuminate\Contracts\Validation\Rule;

class StageIsAvailableForChild implements Rule
{

    protected $child;

    public function __construct(Child $child)
    {
        $this->child = $child;
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
        $stage = Stage::findOrFail($value);

        if ($stage->slug == '1') {
            // La primera etapa sólo es gratis para el primer niño de cada usuario.
            // El resto de niños de cada usuario debe pagar para desbloquear todas
            // las etapas.
            if ($this->child->user->children()->first()->id == $this->child->id) {
                return true;
            }
        }

        return $this->child->licenses()->active()->count() > 0;
    }

    /**
     * Get the validation error message.
     *
     * @return string|array
     */
    public function message()
    {
        return ___('Tu niñ@ no puede realizar esta etapa');
    }

}