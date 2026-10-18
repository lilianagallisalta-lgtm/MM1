<?php
//
//namespace Tests\Modules\Exam;
//
//use App\Modules\Question\Models\AgeRange;
//use App\Modules\Question\Models\Area;
//use App\Modules\Question\Requests\QuestionUpsertRequest;
//use Tests\TestCase;
//
//class QuestionUpsertTest extends TestCase
//{
//    public function testCreate()
//    {
//        $attributes = [
//            'title' => [
//                'es_AR' => $this->faker->title,
//                'en' => $this->faker->title,
//            ],
//            'body' => [
//                'es_AR' => $this->faker->text(140),
//                'en' => $this->faker->text(140),
//            ],
//            'level' => $this->faker->numberBetween(1, 3),
//            'area_id' => Area::inRandomOrder()->first()->id,
//            'ageRange_id' => AgeRange::inRandomOrder()->first()->id,
//        ];
//
//        $question = (new QuestionUpsertRequest($attributes))
//            ->upsert();
//
//        $this->assertDatabaseHas('questions', [
//            'id' => $question->id,
//        ]);
//    }
//}