<?php

use Illuminate\Database\Seeder;

class AgesRangesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $agesRanges = [
			['id' => 1, 'display' => '{"es_AR": "Niños de 12 a 24 meses"}', 'min' => 1, 'max' => 2, 'created_at' => '2019-02-18 15:27:18', 'updated_at' => '2019-02-18 15:27:18', 'deleted_at' => NULL],
			['id' => 2, 'display' => '{"es_AR": "Niños de 2 a 3 años"}', 'min' => 2, 'max' => 3, 'created_at' => '2019-02-18 15:27:18', 'updated_at' => '2019-02-18 15:27:18', 'deleted_at' => NULL],
			['id' => 3, 'display' => '{"es_AR": "Niños de 3 a 4 años"}', 'min' => 3, 'max' => 4, 'created_at' => '2019-02-18 15:27:18', 'updated_at' => '2019-02-18 15:27:18', 'deleted_at' => NULL],
			['id' => 4, 'display' => '{"es_AR": "Niños de 4 a 5 años"}', 'min' => 4, 'max' => 5, 'created_at' => '2019-02-18 15:27:18', 'updated_at' => '2019-02-18 15:27:18', 'deleted_at' => NULL],
			['id' => 5, 'display' => '{"es_AR": "Niños de 5 a 6 años"}', 'min' => 5, 'max' => 6, 'created_at' => '2019-02-18 15:27:18', 'updated_at' => '2019-02-18 15:27:18', 'deleted_at' => NULL],
			['id' => 6, 'display' => '{"es_AR": "Niños de 6 a 7 años"}', 'min' => 6, 'max' => 7, 'created_at' => '2019-02-18 15:27:18', 'updated_at' => '2019-02-18 15:27:18', 'deleted_at' => NULL],
			['id' => 7, 'display' => '{"es_AR": "Niños de 7 a 8 años"}', 'min' => 7, 'max' => 8, 'created_at' => '2019-02-18 15:27:18', 'updated_at' => '2019-02-18 15:27:18', 'deleted_at' => NULL],
        ];
        DB::table('agesRanges')->insert($agesRanges);
    }
}
