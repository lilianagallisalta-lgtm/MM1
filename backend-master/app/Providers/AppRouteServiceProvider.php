<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class AppRouteServiceProvider extends ServiceProvider
{
    protected $appName = 'app';
    protected $namespace = 'App\Modules';

    public function boot()
    {
        parent::boot();
    }

    public function map()
    {
//        $this->mapApiRoutes();
//
//        $this->mapAdminRoutes();
//
//        $this->mapWebRoutes();
    }

    protected function mapApiRoutes()
    {
        Route::prefix('api/v1')
            ->middleware('api')
            ->namespace($this->namespace)
            ->group(base_path("routes/{$this->appName}.api.v1.routes.php"));
    }

    protected function mapAdminRoutes()
    {
        Route::prefix('api/admin/v1')
            ->middleware('api')
            ->namespace($this->namespace)
            ->group(base_path("routes/{$this->appName}.admin.v1.routes.php"));
    }

    protected function mapWebRoutes()
    {
        Route::prefix('')
            ->middleware('web')
            ->namespace($this->namespace)
            ->group(base_path("routes/{$this->appName}.web.v1.routes.php"));
    }
}

