<?php

namespace Tests;

use App\Hawk\User\Models\User;
use Hawk\LighthouseExtended\Tests\NewTestGraphql;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;

class GraphqlTestCase extends BaseTestCase
{

    use CreatesApplication, NewTestGraphql;

    protected $faker;

    public function setUp()
    {
        parent::setUp();

        $this->faker = \Faker\Factory::create();

        $this->artisan('migrate:fresh');
        $this->artisan('db:seed');
    }

    public function as($userOrRole)
    {
        if ($userOrRole instanceof User) {
            Auth::setUser($userOrRole);
            return $userOrRole;
        } else {
            $role = Role::query()
                ->whereName($userOrRole)
                ->first();
            $user = $role
                ->users()
                ->inRandomOrder()
                ->first();
            if (! $user) {
                $user = factory(User::class)->create();
                $user->assignRole($role);
            }
            Auth::setUser($user);
            return $user;
        }
    }

}