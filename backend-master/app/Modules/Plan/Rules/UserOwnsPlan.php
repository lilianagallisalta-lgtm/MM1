<?php

namespace App\Modules\Plan\Rules;

use App\Hawk\User\Models\User;
use App\Modules\Plan\Models\Plan;
use Illuminate\Contracts\Validation\Rule;

class UserOwnsPlan implements Rule
{

    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
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
        $userChildrenId = $this->user->children()->pluck('children.id');
        return $userChildrenId->contains(Plan::findOrFail($value)->child_id);
    }

    /**
     * Get the validation error message.
     *
     * @return string|array
     */
    public function message()
    {
        return ___('Plan no encontrado');
    }

}