<?php
//
//namespace Tests\Modules\Exam;
//
//use App\Hawk\User\Models\User;
////use App\Modules\Exam\Models\Examined;
////use App\Modules\Exam\Requests\ExaminedUpsertRequest;
//use App\Modules\Exam\Requests\ExamUpsertRequest;
////use App\Modules\Question\Models\AnswerOption;
////use App\Modules\Question\Models\Area;
////use App\Modules\Question\Requests\AnswerUpsertRequest;
////use App\Modules\Question\Requests\QuestionUpsertRequest;
//use Illuminate\Support\Facades\Auth;
//use Tests\CreatesApplication;
//use Tests\TestCase;
//
//class AnswerTest extends TestCase
//{
//    use CreatesApplication;
//
//    protected $me;
//    protected $exam;
//    protected $examined;
//
//    public function bootstrap()
//    {
//        $this->me = factory(User::class)->create();
//
//        Auth::setUser($this->me);
//
//        $this->exam = (new ExamUpsertRequest([
//            'name' => 'test exam',
//        ]))->upsert();
//
//        $this->examined = (new ExaminedUpsertRequest(factory(Examined::class)->make()->toArray()))
//            ->exam($this->exam)
//            ->upsert();
//    }
//
////    public function testAnswer()
////    {
////        $this->bootstrap();
////
////        $area = Area::inRandomOrder()->first();
////
////        $question = $area->questions()->inRandomOrder()->first();
////
////        $answerOption = AnswerOption::inRandomOrder()->first();
////
////        $answer = (new AnswerUpsertRequest())
////            ->question($question)
////            ->answerOption($answerOption)
////            ->examined($this->examined)
////            ->upsert();
////
////        $this->assertDatabaseHas('answers', [
////            'id' => $answer->id,
////            'question_id' => $question->id,
////            'answerOption_id' => $answerOption->id,
////            'exam_id' => $this->exam->id,
////            'examined_id' => $this->examined->id,
////        ]);
////    }
//}