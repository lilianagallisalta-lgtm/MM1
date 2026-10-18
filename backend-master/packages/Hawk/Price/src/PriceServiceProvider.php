<?php

namespace Hawk\Price;

use Illuminate\Database\Eloquent\Factory;
use Illuminate\Support\ServiceProvider;

class PriceServiceProvider extends ServiceProvider
{
    /**
     * Perform post-registration booting of services.
     *
     * @return void
     */
    public function boot()
    {
        // $this->loadTranslationsFrom(__DIR__.'/../resources/lang', 'hawk');
        // $this->loadViewsFrom(__DIR__.'/../resources/views', 'hawk');
        $this->loadMigrationsFrom(__DIR__ . '/Database/Migrations');
        // $this->loadRoutesFrom(__DIR__.'/routes.php');

        if (! app()->environment('production') && app()->runningInConsole()) {
            app(Factory::class)->load(__DIR__ . '/Factories');
        }

        // Publishing is only necessary when using the CLI.
        if ($this->app->runningInConsole()) {
            $this->bootForConsole();
        }
    }

    /**
     * Register any package services.
     *
     * @return void
     */
    public function register()
    {
        $this->mergeConfigFrom(__DIR__.'/../config/price.php', 'price');

        // Register the service the package provides.
        $this->app->singleton('price', function ($app) {
            return new Price;
        });
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return ['price'];
    }

    /**
     * Console-specific booting.
     *
     * @return void
     */
    protected function bootForConsole()
    {
        // Publishing the configuration file.
        $this->publishes([
            __DIR__.'/../config/price.php' => config_path('price.php'),
        ], 'price.config');

        // Publishing the views.
        /*$this->publishes([
            __DIR__.'/../resources/views' => base_path('resources/views/vendor/hawk'),
        ], 'price.views');*/

        // Publishing assets.
        /*$this->publishes([
            __DIR__.'/../resources/assets' => public_path('vendor/hawk'),
        ], 'price.views');*/

        // Publishing the translation files.
        /*$this->publishes([
            __DIR__.'/../resources/lang' => resource_path('lang/vendor/hawk'),
        ], 'price.views');*/

        // Registering package commands.
        // $this->commands([]);
    }
}
