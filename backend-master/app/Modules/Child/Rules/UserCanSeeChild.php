<?php

namespace App\Modules\Child\Rules;

use App\Hawk\User\Models\User;
use App\Modules\Child\Models\Child;
use Illuminate\Contracts\Validation\Rule;

class UserCanSeeChild implements Rule
{

    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

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
        $child = Child::findOrFail($value);

        if ($this->user->hasRole('admin')) {
            return true;
        }

        if ($child->user_id != $this->user->id) {
            return false;
        }

        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string|array
     */
    public function message()
    {
        return ___('Niñ@ no encontrad@');
    }

}