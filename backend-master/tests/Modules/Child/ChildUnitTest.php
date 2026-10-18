<?php

use App\Hawk\User\Models\User;
use App\Modules\Child\Models\Child;
use App\Modules\License\Graphql\Mutations\PurchaseLicenseMutation;
use App\Modules\Question\Graphql\Mutations\AnswerMutation;
use App\Modules\Question\Models\AnswerOption;
use App\Modules\Question\Models\Area;
use App\Modules\Question\Models\Question;
use App\Modules\Question\Rules\StageIsCompleted;
use App\Modules\Stage\Models\Stage;
use Hawk\LighthouseExtended\Exceptions\HkMutationException;
use Hawk\LighthouseExtended\Support\Mutations\Mutate;
use Tests\GraphqlTestCase;

class ChildUnitTest extends GraphqlTestCase
{

    protected $user;
    protected $child;
    protected $plan;

    public function setUp()
    {
        parent::setUp();

        $this->user = factory(User::class)->create();
        $this->as($this->user);
        $this->child = factory(Child::class)->create(['user_id' => $this->user->id]);
        $this->plan = $this->child->plans()->uncompleted()->first();
    }

    /**
     * @test
     */
    public function it_is_created_with_a_plan()
    {
        $this->assertEquals(1, $this->child->plans()->count());
    }

    /**
     * @test
     */
    public function it_can_do_multiple_stages_every_x_months()
    {
        $nPlans = 3;

        // Compra la licencia
        Mutate::fromClass(PurchaseLicenseMutation::class, [
            'childId' => $this->child->id,
            'token' => 'TEST',
            'installments' => '1',
            'paymentMethodId' => '1',
        ]);

        $stages = Stage::byAgeRange($this->plan->ageRange)->get();

        for ($i = 0; $i < $nPlans; $i++) {
            if (! $this->plan = $this->child->plans()->uncompleted()->first()) {
                $this->plan = $this->child->plans()->create([
                    'idx' => $this->child->plans()->count + 1,
                    'ageRange_id' => $this->child->ageRange->id,
                ]);
            }

            foreach ($stages as $stage) {
                // La etapa al principio NO está completada.
                $this->assertFalse(
                    (new StageIsCompleted($this->plan))->passes('stageId', $stage->id)
                );

                while ($nextQuestion = Question::nextForPlan($this->plan, $stage)->first()) {
                    Mutate::fromClass(AnswerMutation::class, [
                        'planId' => $this->plan->id,
                        'questionId' => $nextQuestion->id,
                        'answerOptionId' => AnswerOption::inRandomOrder()->first()->id,
                    ]);
                }
            }
            $this->assertEquals(
                $stages->count() * Area::count(),
                $this->plan
                    ->results()
                    ->count()
            );

            foreach ($stages as $stage) {
                // Ahora cada estapa está completada.
                $this->assertTrue(
                    (new StageIsCompleted($this->plan))->passes('stageId', $stage->id)
                );
            }

            $this->plan = $this->plan->fresh();
            $this->assertTrue($this->plan->completed);
        }

        $this->assertEquals($nPlans, $this->child->plans()->completed()->count());
        $this->assertEquals(0, $this->child->plans()->uncompleted()->count());
    }

    /**
     * @test
     */
    public function it_cant_do_a_stage_without_a_license()
    {
        $this->expectException(HkMutationException::class);
        Mutate::fromClass(AnswerMutation::class, [
            'planId' => $this->plan->id,
            'questionId' => Question::nextForPlan(
                                $this->plan,
                                Stage::byAgeRange($this->plan->ageRange)->inRandomOrder()->first()
                            )->first()->id,
            'answerOptionId' => AnswerOption::inRandomOrder()->first()->id,
        ]);
    }

}