<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
    }

    public function register()
    {
        \Gate::before(function ($user, $ability) {
           if ($user->isSuperAdmin()) {
               return true;
           }
        });

        if ($this->app->isLocal() && env('TELESCOPE_ENABLED') === true) {
//            $this->app->register(TelescopeServiceProvider::class);
        }
    }
}
