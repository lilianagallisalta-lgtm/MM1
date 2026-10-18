<?php

namespace App\Modules\User\Database\Seeds;

use App\Hawk\User\Models\User;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserModuleSeeder extends \Illuminate\Database\Seeder
{
    public function run()
    {
        Role::create([
            'name' => 'sadmin',
            'guard_name' => 'api',
        ]);

        Role::create([
            'name' => 'admin',
            'guard_name' => 'api',
        ]);

        $this->seedPermissions();

        $this->admins();
    }

    public function admins()
    {
        $role = Role::whereName('sadmin')->first();

        User::create([
            'firstname' => 'Enzo',
            'lastname' => 'Notario',
            'email' => 'enzo.notario@gmail.com',
            'password' => \Hash::make('enotario'),
            'country' => 'Argentina',
            'province' => 'Salta',
        ])->assignRole($role);

        User::create([
            'firstname' => 'Fernando',
            'lastname' => 'Zerega',
            'email' => 'fjzerega@gmail.com',
            'password' => \Hash::make('fjzerega'),
            'country' => 'Argentina',
            'province' => 'Salta',
        ])->assignRole($role);
    }

    public function seedPermissions()
    {
        $permissions = [];

        foreach ($permissions as $permission) {
            Permission::create([
                'name' => $permission,
            ]);
        }
    }
}