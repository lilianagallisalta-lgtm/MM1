<?php

namespace App\Modules\User;

use Hawk\Support\Providers\HkModuleServiceProvider;

class UserModuleServiceProvider extends HkModuleServiceProvider
{

    protected $name = 'user';

    protected $registerConfig = false;

}