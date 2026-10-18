<?php

use App\Hawk\User\Models\User;
use App\Modules\Child\Graphql\Mutations\UpsertChildMutation;
use App\Modules\Question\Graphql\Mutations\AnswerMutation;
use App\Modules\Question\Graphql\Queries\NextQuestionQuery;
use App\Modules\Question\Models\AgeRange;
use App\Modules\Question\Models\AnswerOption;
use App\Modules\Stage\Models\Stage;
use Cake\Chronos\Chronos;
use Hawk\LighthouseExtended\Support\Mutations\Mutate;
use Hawk\Support\Database\HkSeeder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class FakeSeeder extends HkSeeder
{
    public function run()
    {
        foreach (User::all() as $user) {
            Auth::setUser($user);

            foreach (AgeRange::all() as $ageRange) {
                $child = (new UpsertChildMutation([
                    'name' => $this->faker->name,
                    'birthdate' => Chronos::now()->subYears($ageRange->min)->format('Y-m-d'),
                    'gender' => $this->faker->randomElement(['male', 'female']),
                ]))->mutate();

                $child->licenses()->create([
                    'uuid' => (string) Str::uuid(),
                    'expires_at' => Chronos::now()->endOfCentury()->toDateTimeString(),
                ]);

                foreach (Stage::forChild($child)->get() as $stage) {
                    while ($nextQuestion = (new NextQuestionQuery())->handle(null, ['stageId' => $stage->id, 'childId' => $child->id])) {
                        Mutate::fromClass(AnswerMutation::class, [
                            'childId' => $child->id,
                            'questionId' => $nextQuestion->id,
                            'answerOptionId' => AnswerOption::inRandomOrder()->first()->id,
                        ]);
                    }
                }
            }
        }
    }
}
