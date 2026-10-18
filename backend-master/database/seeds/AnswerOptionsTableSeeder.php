<?php

use Illuminate\Database\Seeder;

class AnswerOptionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $answerOptions = [
			['id' => 1, 'display' => '{"en": "Always", "es_AR": "Siempre"}', 'slug' => 'always', 'created_at' => '2019-02-18 15:27:18', 'updated_at' => '2019-02-18 15:27:18', 'deleted_at' => NULL],
			['id' => 2, 'display' => '{"en": "Some times", "es_AR": "A veces"}', 'slug' => 'sometimes', 'created_at' => '2019-02-18 15:27:18', 'updated_at' => '2019-02-18 15:27:18', 'deleted_at' => NULL],
			['id' => 3, 'display' => '{"en": "Never", "es_AR": "Nunca"}', 'slug' => 'never', 'created_at' => '2019-02-18 15:27:18', 'updated_at' => '2019-02-18 15:27:18', 'deleted_at' => NULL],
        ];
        DB::table('answerOptions')->insert($answerOptions);
    }
}
