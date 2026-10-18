<?php

use Illuminate\Database\Seeder;

class ResultsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $results = [
			['id' => 1, 'percentage' => 0.2500, 'slug' => 'bad', 'child_id' => 1, 'stage_id' => 1, 'area_id' => 1, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:14', 'updated_at' => '2019-02-18 15:28:14', 'deleted_at' => NULL],
			['id' => 2, 'percentage' => 0.4333, 'slug' => 'bad', 'child_id' => 1, 'stage_id' => 1, 'area_id' => 2, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:14', 'updated_at' => '2019-02-18 15:28:14', 'deleted_at' => NULL],
			['id' => 3, 'percentage' => 0.3500, 'slug' => 'bad', 'child_id' => 1, 'stage_id' => 1, 'area_id' => 3, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:14', 'updated_at' => '2019-02-18 15:28:14', 'deleted_at' => NULL],
			['id' => 4, 'percentage' => 0.5333, 'slug' => 'so so', 'child_id' => 2, 'stage_id' => 1, 'area_id' => 1, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:15', 'updated_at' => '2019-02-18 15:28:15', 'deleted_at' => NULL],
			['id' => 5, 'percentage' => 0.3333, 'slug' => 'bad', 'child_id' => 2, 'stage_id' => 1, 'area_id' => 2, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:15', 'updated_at' => '2019-02-18 15:28:15', 'deleted_at' => NULL],
			['id' => 6, 'percentage' => 0.4167, 'slug' => 'bad', 'child_id' => 2, 'stage_id' => 1, 'area_id' => 3, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:15', 'updated_at' => '2019-02-18 15:28:15', 'deleted_at' => NULL],
			['id' => 7, 'percentage' => 0.3333, 'slug' => 'bad', 'child_id' => 3, 'stage_id' => 1, 'area_id' => 1, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:16', 'updated_at' => '2019-02-18 15:28:16', 'deleted_at' => NULL],
			['id' => 8, 'percentage' => 0.4500, 'slug' => 'bad', 'child_id' => 3, 'stage_id' => 1, 'area_id' => 2, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:16', 'updated_at' => '2019-02-18 15:28:16', 'deleted_at' => NULL],
			['id' => 9, 'percentage' => 0.4500, 'slug' => 'bad', 'child_id' => 3, 'stage_id' => 1, 'area_id' => 3, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:16', 'updated_at' => '2019-02-18 15:28:16', 'deleted_at' => NULL],
			['id' => 10, 'percentage' => 0.3667, 'slug' => 'bad', 'child_id' => 4, 'stage_id' => 1, 'area_id' => 1, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:17', 'updated_at' => '2019-02-18 15:28:17', 'deleted_at' => NULL],
			['id' => 11, 'percentage' => 0.5333, 'slug' => 'so so', 'child_id' => 4, 'stage_id' => 1, 'area_id' => 2, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:17', 'updated_at' => '2019-02-18 15:28:17', 'deleted_at' => NULL],
			['id' => 12, 'percentage' => 0.2000, 'slug' => 'bad', 'child_id' => 4, 'stage_id' => 1, 'area_id' => 3, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:17', 'updated_at' => '2019-02-18 15:28:17', 'deleted_at' => NULL],
			['id' => 13, 'percentage' => 0.4667, 'slug' => 'bad', 'child_id' => 5, 'stage_id' => 1, 'area_id' => 1, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:18', 'updated_at' => '2019-02-18 15:28:18', 'deleted_at' => NULL],
			['id' => 14, 'percentage' => 0.4000, 'slug' => 'bad', 'child_id' => 5, 'stage_id' => 1, 'area_id' => 2, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:18', 'updated_at' => '2019-02-18 15:28:18', 'deleted_at' => NULL],
			['id' => 15, 'percentage' => 0.5333, 'slug' => 'so so', 'child_id' => 5, 'stage_id' => 1, 'area_id' => 3, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:18', 'updated_at' => '2019-02-18 15:28:18', 'deleted_at' => NULL],
			['id' => 16, 'percentage' => 0.3667, 'slug' => 'bad', 'child_id' => 6, 'stage_id' => 1, 'area_id' => 1, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:19', 'updated_at' => '2019-02-18 15:28:19', 'deleted_at' => NULL],
			['id' => 17, 'percentage' => 0.4167, 'slug' => 'bad', 'child_id' => 6, 'stage_id' => 1, 'area_id' => 2, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:19', 'updated_at' => '2019-02-18 15:28:19', 'deleted_at' => NULL],
			['id' => 18, 'percentage' => 0.4000, 'slug' => 'bad', 'child_id' => 6, 'stage_id' => 1, 'area_id' => 3, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:19', 'updated_at' => '2019-02-18 15:28:19', 'deleted_at' => NULL],
			['id' => 19, 'percentage' => 0.2333, 'slug' => 'bad', 'child_id' => 7, 'stage_id' => 1, 'area_id' => 1, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:20', 'updated_at' => '2019-02-18 15:28:20', 'deleted_at' => NULL],
			['id' => 20, 'percentage' => 0.3833, 'slug' => 'bad', 'child_id' => 7, 'stage_id' => 1, 'area_id' => 2, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:20', 'updated_at' => '2019-02-18 15:28:20', 'deleted_at' => NULL],
			['id' => 21, 'percentage' => 0.3833, 'slug' => 'bad', 'child_id' => 7, 'stage_id' => 1, 'area_id' => 3, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:20', 'updated_at' => '2019-02-18 15:28:20', 'deleted_at' => NULL],
			['id' => 22, 'percentage' => 0.5333, 'slug' => 'so so', 'child_id' => 8, 'stage_id' => 1, 'area_id' => 1, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:21', 'updated_at' => '2019-02-18 15:28:21', 'deleted_at' => NULL],
			['id' => 23, 'percentage' => 0.4667, 'slug' => 'bad', 'child_id' => 8, 'stage_id' => 1, 'area_id' => 2, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:21', 'updated_at' => '2019-02-18 15:28:21', 'deleted_at' => NULL],
			['id' => 24, 'percentage' => 0.5333, 'slug' => 'so so', 'child_id' => 8, 'stage_id' => 1, 'area_id' => 3, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:21', 'updated_at' => '2019-02-18 15:28:21', 'deleted_at' => NULL],
			['id' => 25, 'percentage' => 0.3667, 'slug' => 'bad', 'child_id' => 9, 'stage_id' => 1, 'area_id' => 1, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:22', 'updated_at' => '2019-02-18 15:28:22', 'deleted_at' => NULL],
			['id' => 26, 'percentage' => 0.2833, 'slug' => 'bad', 'child_id' => 9, 'stage_id' => 1, 'area_id' => 2, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:22', 'updated_at' => '2019-02-18 15:28:22', 'deleted_at' => NULL],
			['id' => 27, 'percentage' => 0.4667, 'slug' => 'bad', 'child_id' => 9, 'stage_id' => 1, 'area_id' => 3, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:22', 'updated_at' => '2019-02-18 15:28:22', 'deleted_at' => NULL],
			['id' => 28, 'percentage' => 0.2833, 'slug' => 'bad', 'child_id' => 10, 'stage_id' => 1, 'area_id' => 1, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:23', 'updated_at' => '2019-02-18 15:28:23', 'deleted_at' => NULL],
			['id' => 29, 'percentage' => 0.3167, 'slug' => 'bad', 'child_id' => 10, 'stage_id' => 1, 'area_id' => 2, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:23', 'updated_at' => '2019-02-18 15:28:23', 'deleted_at' => NULL],
			['id' => 30, 'percentage' => 0.6500, 'slug' => 'so so', 'child_id' => 10, 'stage_id' => 1, 'area_id' => 3, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:23', 'updated_at' => '2019-02-18 15:28:23', 'deleted_at' => NULL],
			['id' => 31, 'percentage' => 0.3667, 'slug' => 'bad', 'child_id' => 11, 'stage_id' => 1, 'area_id' => 1, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:24', 'updated_at' => '2019-02-18 15:28:24', 'deleted_at' => NULL],
			['id' => 32, 'percentage' => 0.4000, 'slug' => 'bad', 'child_id' => 11, 'stage_id' => 1, 'area_id' => 2, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:24', 'updated_at' => '2019-02-18 15:28:24', 'deleted_at' => NULL],
			['id' => 33, 'percentage' => 0.4833, 'slug' => 'bad', 'child_id' => 11, 'stage_id' => 1, 'area_id' => 3, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:24', 'updated_at' => '2019-02-18 15:28:24', 'deleted_at' => NULL],
			['id' => 34, 'percentage' => 0.4667, 'slug' => 'bad', 'child_id' => 12, 'stage_id' => 1, 'area_id' => 1, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:25', 'updated_at' => '2019-02-18 15:28:25', 'deleted_at' => NULL],
			['id' => 35, 'percentage' => 0.3000, 'slug' => 'bad', 'child_id' => 12, 'stage_id' => 1, 'area_id' => 2, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:25', 'updated_at' => '2019-02-18 15:28:25', 'deleted_at' => NULL],
			['id' => 36, 'percentage' => 0.1500, 'slug' => 'bad', 'child_id' => 12, 'stage_id' => 1, 'area_id' => 3, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:25', 'updated_at' => '2019-02-18 15:28:25', 'deleted_at' => NULL],
			['id' => 37, 'percentage' => 0.3833, 'slug' => 'bad', 'child_id' => 13, 'stage_id' => 1, 'area_id' => 1, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:26', 'updated_at' => '2019-02-18 15:28:26', 'deleted_at' => NULL],
			['id' => 38, 'percentage' => 0.4667, 'slug' => 'bad', 'child_id' => 13, 'stage_id' => 1, 'area_id' => 2, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:26', 'updated_at' => '2019-02-18 15:28:26', 'deleted_at' => NULL],
			['id' => 39, 'percentage' => 0.2500, 'slug' => 'bad', 'child_id' => 13, 'stage_id' => 1, 'area_id' => 3, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:26', 'updated_at' => '2019-02-18 15:28:26', 'deleted_at' => NULL],
			['id' => 40, 'percentage' => 0.4333, 'slug' => 'bad', 'child_id' => 14, 'stage_id' => 1, 'area_id' => 1, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:27', 'updated_at' => '2019-02-18 15:28:27', 'deleted_at' => NULL],
			['id' => 41, 'percentage' => 0.5667, 'slug' => 'so so', 'child_id' => 14, 'stage_id' => 1, 'area_id' => 2, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:27', 'updated_at' => '2019-02-18 15:28:27', 'deleted_at' => NULL],
			['id' => 42, 'percentage' => 0.2667, 'slug' => 'bad', 'child_id' => 14, 'stage_id' => 1, 'area_id' => 3, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:28:27', 'updated_at' => '2019-02-18 15:28:27', 'deleted_at' => NULL],
			['id' => 43, 'percentage' => 1.0000, 'slug' => 'good', 'child_id' => 15, 'stage_id' => 1, 'area_id' => 1, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:30:09', 'updated_at' => '2019-02-18 15:30:09', 'deleted_at' => NULL],
			['id' => 44, 'percentage' => 1.0000, 'slug' => 'good', 'child_id' => 15, 'stage_id' => 1, 'area_id' => 2, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:30:09', 'updated_at' => '2019-02-18 15:30:09', 'deleted_at' => NULL],
			['id' => 45, 'percentage' => 1.0000, 'slug' => 'good', 'child_id' => 15, 'stage_id' => 1, 'area_id' => 3, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:30:10', 'updated_at' => '2019-02-18 15:30:10', 'deleted_at' => NULL],
			['id' => 46, 'percentage' => '0.0000', 'slug' => 'very bad', 'child_id' => 16, 'stage_id' => 1, 'area_id' => 1, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:31:37', 'updated_at' => '2019-02-18 15:31:37', 'deleted_at' => NULL],
			['id' => 47, 'percentage' => '0.0000', 'slug' => 'very bad', 'child_id' => 16, 'stage_id' => 1, 'area_id' => 2, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:31:38', 'updated_at' => '2019-02-18 15:31:38', 'deleted_at' => NULL],
			['id' => 48, 'percentage' => '0.0000', 'slug' => 'very bad', 'child_id' => 16, 'stage_id' => 1, 'area_id' => 3, 'extra_attributes' => NULL, 'created_at' => '2019-02-18 15:31:38', 'updated_at' => '2019-02-18 15:31:38', 'deleted_at' => NULL],
        ];
        DB::table('results')->insert($results);
    }
}
