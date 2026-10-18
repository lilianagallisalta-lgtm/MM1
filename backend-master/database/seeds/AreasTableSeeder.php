<?php

use Illuminate\Database\Seeder;

class AreasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $areas = [
			['id' => 1, 'name' => '{"es_AR": "Cuerpo"}', 'slug' => 'cuerpo', 'picture' => 'https://mentesmejorando.com/storage/areas/body.svg', 'created_at' => '2019-02-18 15:44:30', 'updated_at' => '2019-02-18 15:44:30', 'deleted_at' => NULL],
			['id' => 2, 'name' => '{"es_AR": "Mente"}', 'slug' => 'mente', 'picture' => 'https://mentesmejorando.com/storage/areas/brain.svg', 'created_at' => '2019-02-18 15:44:30', 'updated_at' => '2019-02-18 15:44:30', 'deleted_at' => NULL],
			['id' => 3, 'name' => '{"es_AR": "Corazón"}', 'slug' => 'corazon', 'picture' => 'https://mentesmejorando.com/storage/areas/heart.svg', 'created_at' => '2019-02-18 15:44:30', 'updated_at' => '2019-02-18 15:44:30', 'deleted_at' => NULL],
        ];
        DB::table('areas')->insert($areas);
    }
}
