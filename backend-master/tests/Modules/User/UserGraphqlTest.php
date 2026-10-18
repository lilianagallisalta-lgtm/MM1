<?php

namespace Tests\Modules\User;

use App\Hawk\User\Models\User;
use App\Modules\User\Graphql\Mutations\SignupMutation;
use Tests\GraphqlTestCase;

class UserGraphqlTest extends GraphqlTestCase
{
    public function testSignupMutation()
    {
        $response = $this->mutation('token:signup', [
            'input' => [
                'firstname' => 'asd',
                'lastname' => 'qwe',
                'email' => 'test@hawk-srl.com',
                'password' => 'asdasd',
                'passwordConfirmation' => 'asdasd',
            ],
        ]);

        $token = $response->json('data.token');

        \JWTAuth::setToken($token);

        $user = \JWTAuth::authenticate();

        $this->assertInstanceOf(User::class, $user);
    }

    public function testSigninMutation()
    {
        (new SignupMutation([
            'firstname' => 'asd',
            'lastname' => 'qwe',
            'email' => 'test@hawk-srl.com',
            'password' => 'asdasd',
            'passwordConfirmation' => 'asdasd',
        ]))->mutate();

        $response = $this->mutation('token:signin', [
            'input' => [
                'email' => 'test@hawk-srl.com',
                'password' => 'asdasd',
            ],
        ]);

        $token = $response->json('data.token');

        \JWTAuth::setToken($token);

        $user = \JWTAuth::authenticate();

        $this->assertInstanceOf(User::class, $user);

        $me = $this->query('me', [], [
            'id',
        ]);

        $this->assertEquals($user->id, $me->json('data.me.id'));
    }
}