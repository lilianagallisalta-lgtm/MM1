<?php

namespace App\Modules\User\Graphql\Mutations;

use App\Modules\User\Models\PushToken;
use Hawk\LighthouseExtended\Support\Mutations\HkMutation;

class RegisterPushTokenMutation extends HkMutation
{

    protected $me;

    public function authorize()
    {
        $this->me = me();
        return $this->me !== null;
    }

    public function setRules()
    {
        $this->rules = [
            'token' => [
                'required',
            ],
        ];
    }

    public function mutate()
    {
        $pushToken = $this->me
            ->pushTokens()
            ->where('pushTokens.token', $this->input('token'))
            ->first();

        if (! $pushToken) {
            $pushToken = PushToken::create([
                'user_id' => $this->me->id,
                'token' => $this->input('token'),
            ]);
        }

        return $pushToken;
    }

}