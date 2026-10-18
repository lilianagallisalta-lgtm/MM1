<?php

namespace Hawk\Price\Database\Seeds;

use Hawk\Price\Models\PriceType;

class PriceModuleSeeder extends \Illuminate\Database\Seeder
{
    public function run()
    {
        PriceType::create([
            'slug' => 'unique',
            'name' => [
                'es_AR' => 'Precio único',
            ],
            'default' => true,
        ]);

        PriceType::create([
            'slug' => 'multiple',
            'name' => [
                'es_AR' => 'Precio por fecha',
            ],
            'default' => false,
        ]);

        PriceType::create([
            'slug' => 'through',
            'name' => [
                'es_AR' => 'A través ...',
            ],
            'default' => false,
        ]);
    }
}