<?php

use App\Hawk\User\Models\User;
use App\Modules\Child\Models\Child;
use App\Modules\Plan\Models\Plan;
use App\Modules\Question\Models\AgeRange;
use App\Modules\Question\Models\AnswerOption;
use App\Modules\Question\Models\Area;
use App\Modules\Result\Models\Result;
use App\Modules\Stage\Models\Stage;
use App\Modules\User\Graphql\Mutations\SignupMutation;
use Cake\Chronos\Chronos;
use Hawk\LighthouseExtended\Testing\TestCollection;
use Hawk\LighthouseExtended\Testing\TestItem;
use Hawk\PromotionCode\Repositories\PromotionCodeRepository;
use Illuminate\Support\Str;
use Tests\GraphqlTestCase;

class ChildGraphqlTest extends GraphqlTestCase
{

    public function testCreate()
    {
        $jwt = (new SignupMutation([
            'firstname' => 'Juan',
            'lastname' => 'Perez',
            'email' => 'qwe@hawk-srl.com',
            'password' => 'asdasd',
            'passwordConfirmation' => 'asdasd',
        ]))->mutate();
        \JWTAuth::setToken($jwt);
        $user = \JWTAuth::authenticate();

        for ($i = 2; $i <= 7; $i++) {
            $this
                ->mutation(
                    'upsertChild',
                    [
                        'input' => [
                            'name' => 'Juancito',
                            'birthdate' => Chronos::now()->subYears($i)->toDateTimeString(),
                            'gender' => $this->faker->randomElement(['male', 'female']),
                        ],
                    ],
                    [
                        'id',
                        'name',
                        'birthdate',
                        'gender',
                    ]
                )
                ->item(function (TestItem $child) {
                    $child = Child::whereUuid($child->id)->first();
                    $this->assertNotNull($child);
                });
        }
    }

    public function testChildQuery()
    {
        \Auth::setUser(User::find(1));

        $upsertChildMutation = $this
            ->mutation(
                'upsertChild',
                [
                    'input' => [
                        'name' => 'Juancito',
                        'gender' => 'male',
                        'birthdate' => Chronos::now()->subYears(3)->toDateTimeString(),
                    ],
                ],
                ['id']
            );

        $this
            ->query(
                'child',
                ['id' => $upsertChildMutation->id],
                [
                    'id',
                    'name',
                    'age',
                ]
            )
            ->item(function (TestItem $child) use ($upsertChildMutation) {
                $this->assertEquals(
                    $upsertChildMutation->id,
                    $child->id
                );
            });
    }

    public function testMeChildren()
    {
        $user = User::find(1);
        \Auth::setUser($user);

        $this
            ->mutation(
                'upsertChild',
                [
                    'input' => [
                        'name' => 'Juancito',
                        'birthdate' => Chronos::now()->subYears(3)->toDateTimeString(),
                        'gender' => 'male',
                    ]
                ],
                ['id']
            );

        $this
            ->query(
                'children',
                [],
                [
                    'data' => [
                        'id',
                        'name',
                        'age',
                    ],
                ]
            )
            ->collection(function (TestCollection $children) use ($user) {
                $children->hasIds($user->children()->pluck('uuid'));
            });
    }

    /**
     * De cada usuario, sólo el primer niño tiene la 1° etapa gratis (para la 2° y 3°
     * debe pagar). Los siguientes niños no tienen ningúna, y deben realizar el
     * pago para desbloquear TODAS las etapas.
     */
    public function testChildPurchase()
    {
        $user = factory(User::class)->create();
        $user->children()->forceDelete();
        $this->as($user);

        /**
         * El primer niño sólo tiene disponible la primera etapa.
         */
        $firstChild = factory(Child::class)->create([
            'user_id' => $user->id,
        ]);
        $this
            ->query(
                'child',
                ['id' => $firstChild->uuid],
                [
                    'id',
                    'hasActiveLicense',
                    'currentPlan' => [
                        'id',
                    ],
                ]
            )
            ->item(function (TestItem $child) {
                $this->assertEquals(false, $child->hasActiveLicense);
                foreach (Stage::all() as $stageInstance) {
                    $this
                        ->query(
                            'stage',
                            ['id' => $stageInstance->id],
                            [
                                'id',
                                "available ( planId: \"{$child->get('currentPlan.id')}\" )"
                            ]
                        )
                        ->item(function (TestItem $stage) {
                            if ($stage->id == 1) {
                                $this->assertTrue($stage->available);
                            } else {
                                $this->assertFalse($stage->available);
                            }
                        });
                }
            });

        /**
         * El segundo niño no tiene disponible ninguna etapa.
         */
        $secondChild = factory(Child::class)->create([
            'user_id' => $user->id,
        ]);
        $this
            ->query(
                'child',
                ['id' => $secondChild->uuid],
                [
                    'id',
                    'hasActiveLicense',
                    'currentPlan' => [
                        'id',
                    ],
                ]
            )
            ->item(function (TestItem $child) {
                $this->assertEquals(false, $child->hasActiveLicense);
                foreach (Stage::all() as $stageInstance) {
                    $this
                        ->query(
                            'stage',
                            ['id' => $stageInstance->id],
                            [
                                'id',
                                "available ( planId: \"{$child->get('currentPlan.id')}\" )"
                            ]
                        )
                        ->item(function (TestItem $stage) {
                            $this->assertFalse($stage->available);
                        });
                }
            });

        /**
         * El tercer niño no tiene ninguna etapa disponible, pero luego paga una
         * licencia y desbloquea todas.
         */
        $thirdChild = factory(Child::class)->create([
            'user_id' => $user->id,
        ]);
        $this
            ->query(
                'child',
                ['id' => $thirdChild->uuid],
                [
                    'id',
                    'hasActiveLicense',
                    'currentPlan' => [
                        'id',
                    ],
                ]
            )
            ->item(function (TestItem $child) {
                $this->assertEquals(false, $child->hasActiveLicense);
                foreach (Stage::all() as $stageInstance) {
                    $this
                        ->query(
                            'stage',
                            ['id' => $stageInstance->id],
                            [
                                'id',
                                "available ( planId: \"{$child->get('currentPlan.id')}\" )"
                            ]
                        )
                        ->item(function (TestItem $stage) {
                            $this->assertFalse($stage->available);
                        });
                }

                $this
                    ->mutation(
                        'purchaseLicense',
                        [
                            'input' => [
                                'childId' => $child->id,
                                'token' => 'TEST',
                                'installments' => '1',
                                'paymentMethodId' => '1',
                            ]
                        ],
                        [
                            'uuid',
                            'expiresAt',
                        ]
                    )
                    ->item(function (TestItem $license) use ($child) {
                        $this->assertNotNull($license->uuid);

                        // El niño ahora tiene disponible todas las etapas.
                        foreach (Stage::all() as $stageInstance) {
                            $this
                                ->query(
                                    'stage',
                                    ['id' => $stageInstance->id],
                                    [
                                        'id',
                                        "available ( planId: \"{$child->get('currentPlan.id')}\" )"
                                    ]
                                )
                                ->item(function (TestItem $stage) {
                                    $this->assertTrue($stage->available);
                                });
                        }
                    });
            });
    }

    public function testHistoryQuery() {
        $user = factory(User::class)->create();
        $this->as($user);
        $childInstance = factory(Child::class)->create(['user_id' => $user->id]);
        $childInstance->licenses()->create([
            'uuid' => (string) Str::uuid(),
            'expires_at' => now()->endOfCentury(),
        ]);

        for ($i = 0; $i <= 2; $i++) {
            foreach (Stage::all() as $stage) {
                while ($plan = $childInstance->plans()->uncompleted()->first() && $questionId = $this->queryNextQuestion($stage->id, $childInstance->plans()->uncompleted()->first()->uuid)->json('data.nextQuestion.id')) {
                    $this->mutation(
                        'answer',
                        [
                            'input' => [
                                'planId' => $childInstance->plans()->uncompleted()->first()->uuid,
                                'questionId' => $questionId,
                                'answerOptionId' => AnswerOption::inRandomOrder()->first()->id,
                            ],
                        ],
                        [
                            'id',
                        ]
                    );
                }
            }
            $childInstance->plans()->create([
                'uuid' => (string) Str::uuid(),
                'idx' => $childInstance->plans()->count() + 1,
                'ageRange_id' => $childInstance->ageRange->id,
            ]);
        }

        $this
            ->query(
                'child',
                ['id' => $childInstance->uuid],
                [
                    'id',
                    'history',
                ]
            )
            ->item(function (TestItem $child) use ($childInstance) {
                $history = collect(json_decode($child->history, true));

                $this->assertEquals(
                    $history,
                    collect(
                        Area::all()->map(function ($area) use ($childInstance) {
                            return [
                                'name' => $area->name,
                                'series' => $childInstance->plans()->completed()->get()->map(function (Plan $plan) use ($area) {
                                    return [
                                        'name' => $plan->idx . '° Plan',
                                        'value' => round(
                                            Result::query()
                                                ->where('plan_id', '=', $plan->id)
                                                ->where('area_id', '=', $area->id)
                                                ->average('percentage') * 100
                                        ),
                                    ];
                                })->toArray(),
                            ];
                        })
                    )
                );
            });
    }

    /**
     * Según el rango de edad del niño, hay 3 o 2 etapas:
     * De 1 a 4: 3 etapas.
     * de 4 a 8: 2 etapas.
     */
    public function testStagesPerChild()
    {
        $this->as($user = factory(User::class)->create());
        foreach (AgeRange::all() as $ageRange) {
            $child = factory(Child::class)->create([
                'user_id' => $user->id,
                'ageRange_id' => $ageRange->id,
            ]);

            $this
                ->query(
                    'stages',
                    ['planId' => $child->plans()->uncompleted()->first()->uuid],
                    [
                        'data' => [
                            'id',
                            'slug',
                        ],
                    ]
                )
                ->collection(function (TestCollection $stages) use ($ageRange) {
                    if ($ageRange->min < 4) {
                        $this->assertEquals(3, $stages->collection->count());
                    } else {
                        $this->assertEquals(2, $stages->collection->count());
                    }
                });
        }
    }

    /**
     * Un código de promoción le da a un niño una licencia (como si la hubiese comprado).
     */
    public function testChildUsesPromotionCode()
    {
        $this->as($user = factory(User::class)->create());
        $child = factory(Child::class)->create([
            'user_id' => $user->id,
        ]);

        // El niño no tiene una licencia activa.
        $this
            ->query(
                'child',
                ['id' => $child->uuid],
                [
                    'hasActiveLicense'
                ]
            )
            ->item(function (TestItem $child) {
                $this->assertFalse($child->hasActiveLicense);
            });

        $promotionCode = app(PromotionCodeRepository::class)->create([
            'code' => 'LANZAMIENTO',
            'percentage' => 1,
            'start' => now(),
            'end' => now()->addDays(7),
            'initialStock' => 3,
        ]);

        $this
            ->mutation(
                'usePromotionCode',
                [
                    'input' => [
                        'childId' => $child->uuid,
                        'code' => $promotionCode->code,
                    ],
                ],
                [
                    'uuid'
                ]
            );

        // El niño ahora si tiene una licencia activa.
        $this
            ->query(
                'child',
                ['id' => $child->uuid],
                [
                    'hasActiveLicense'
                ]
            )
            ->item(function (TestItem $child) {
                $this->assertTrue($child->hasActiveLicense);
            });
    }

    private function queryNextQuestion($stageId, $planId)
    {
        return $this->query(
            'nextQuestion',
            [
                'stageId' => $stageId,
                'planId' => $planId,
            ],
            [
                'id'
            ]
        );
    }

}