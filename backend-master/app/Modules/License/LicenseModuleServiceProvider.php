<?php

namespace App\Modules\License;

use Hawk\Support\Providers\HkModuleServiceProvider;

class LicenseModuleServiceProvider extends HkModuleServiceProvider
{

    protected $name = 'license';

    protected $registerConfig = false;

}