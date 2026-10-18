<?php

namespace App\Modules\User\Graphql\Mutations;

use Hawk\LighthouseExtended\Support\Mutations\HkMutation;

class SigninMutation extends HkMutation
{
    protected $jwt;

    public function authorize(): bool
    {
        return true;
    }

    public function setRules(): void
    {
        $this->rules = [
            'email' => [
                'required',
                'email',
            ],
            'password' => [
                'required',
            ],
        ];
    }

    public function moreValidation()
    {
        $this->jwt = \JWTAuth::attempt([
            'email' => $this->input('email'),
            'password' => $this->input('password'),
        ]);

        $me = null;

        try {
            \JWTAuth::setToken($this->jwt);

            $me = \JWTAuth::authenticate();
        } catch (\Exception $e) {
            if (! $me) {
                $this->addError(
                    'email',
                    'incorrect',
                    'E-mail o contraseña incorrecta'
                );
            }
        }
    }

    public function mutate(): string
    {
        return $this->jwt;
    }
}