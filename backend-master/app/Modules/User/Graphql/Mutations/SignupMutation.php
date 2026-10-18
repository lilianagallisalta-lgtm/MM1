<?php

namespace App\Modules\User\Graphql\Mutations;

use App\Hawk\User\Models\User;
use Hawk\LighthouseExtended\Support\Mutations\HkMutation;
use Illuminate\Support\Facades\Hash;

class SignupMutation extends HkMutation
{
    protected $i18nKey = 'user.mutation.signup';

    public function authorize(): bool
    {
        return true;
    }

    public function setRules(): void
    {
        $this->rules = [
            'firstname' => [
                'required',
            ],
            'lastname' => [
                'required',
            ],
            'email' => [
                'required',
                'email',
                'unique:users,email',
            ],
            'country' => [
                'required',
            ],
            'province' => [
                'required',
            ],
            'password' => [
                'required',
            ],
            'passwordConfirmation' => [
                'required',
                'same:password',
            ],
            'acceptTos' => [
                'accepted',
            ],
        ];
    }

    public function mutate(): string
    {
        $user = User::create([
            'firstname' => $this->input('firstname'),
            'lastname' => $this->input('lastname'),
            'email' => $this->input('email'),
            'country' => $this->input('country'),
            'province' => $this->input('province'),
            'password' => Hash::make($this->input('password')),
        ]);

        return \JWTAuth::fromUser($user);
    }
}