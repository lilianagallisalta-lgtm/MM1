<?php

namespace Tests\Moudules\Stage;

use App\Hawk\User\Models\User;
use App\Modules\Child\Graphql\Mutations\UpsertChildMutation;
use App\Modules\Question\Models\AgeRange;
use App\Modules\Question\Models\AnswerOption;
use App\Modules\Stage\Models\Stage;
use Illuminate\Support\Str;
use Tests\GraphqlTestCase;

class StageGraphqlTest extends GraphqlTestCase
{

    /**
     * Verifica la query `stages` y la `nextQuestion` de cada `stage`.
     */
    public function testStagesQuery()
    {
        // El usuario se registra y agrega un niño.
        \Auth::setUser(User::first());
        $child = (new UpsertChildMutation([
            'name' => $this->faker->name,
            'age' => 1,
            'gender' => 'male',
        ]))->mutate();
        $child->licenses()->create([
            'uuid' => (string) Str::uuid(),
            'expires_at' => now()->endOfCentury(),
        ]);
        $plan = $child->plans()->uncompleted()->first();

        // El niño tiene 0% de progreso en todas las etapas.
        $stagesQuery = $this->query(
            'stages',
            [
                'planId' => $plan->id,
            ],
            [
                'data' => [
                    'id',
                    'slug',
                    'display',

                    "progress (planId: {$plan->id})",
                ],
            ]
        );
        $this->assertArraySubset([
            'data' => [
                [
                    'slug' => 1,
                    'progress' => 0,
                ],
                [
                    'slug' => 2,
                    'progress' => 0,
                ],
                [
                    'slug' => 3,
                    'progress' => 0,
                ],
            ],
        ], $stagesQuery->json('data.stages'));

        $stage = Stage::find(1);
        $firstNextQuestionQuery = $this->query(
            'nextQuestion',
            [
                'stageId' => $stage->id,
                'planId' => $plan->id,
            ],
            [
                'id',
                'display',

                'stage' => [
                    'id',
                    'slug',
                ],
            ]
        );

        // Contesta una pregunta de la primera etapa.
        $this->mutation(
            'answer',
            [
                'input' => [
                    'planId' => $plan->id,
                    'questionId' => $firstNextQuestionQuery->json('data.nextQuestion.id'),
                    'answerOptionId' => AnswerOption::inRandomOrder()->first()->id,
                ],
            ],
            [
                'id',
            ]
        );
        $stagesQuery = $this->query(
            'stages',
            [
                'planId' => $plan->id,
            ],
            [
            'data' => [
                'id',
                'slug',
                'display',
                "progress (planId: {$plan->id})",
            ],
        ]);
        $this->assertGreaterThan(0, $stagesQuery->json('data.stages.data.0.progress'));

        // La siguiente pregunta debe ser distinta a la que ya fue contestada.
        $secondNextQuestionQuery = $this->query(
            'nextQuestion',
            [
                'stageId' => $stage->id,
                'planId' => $plan->id,
            ],
            [
                'id',
                'display',

                'stage' => [
                    'id',
                    'slug',
                ],
            ]
        );
        $this->assertNotEquals(
            $firstNextQuestionQuery->json('data.nextQuestion.id'),
            $secondNextQuestionQuery->json('data.nextQuestion.id')
        );

        // Todas las preguntas, menos la primera, no han sido contestadas.
        $questionsQuery = $this->query(
            'questions',
            [
                'stageId' => $stage->id,
                'planId' => $plan->id,
            ],
            [
                'data' => [
                    'id',
                    'display',
                    'idx',
                    "answered (planId: {$plan->id})",
                ],
            ]
        );
        $this->assertTrue($questionsQuery->json('data.questions.data.0.answered'));
        collect($questionsQuery->json('data.questions.data.*.answered'))
            ->map(function ($answered, $idx) {
                if ($idx != 0) {
                    $this->assertFalse($answered);
                }
            });
    }

    /**
     * Cada `Stage` tiene varias `Question`, cada una con un `Child` inyectado
     * para saber si el niño contestó o no la pregunta.
     */
    public function testStageQuestionsRelationship()
    {
        \Auth::setUser(User::first());
        $child = (new UpsertChildMutation([
            'name' => $this->faker->name,
            'age' => 1,
            'gender' => 'male',
        ]))->mutate();
        $stage = Stage::first();

        // El niño aún no contestó ninguna pregunta.
        $stageQuery = $this->query(
            'stage',
            [
                'id' => $stage->id,
            ],
            [
                'id',
                "questions(childId: $child->id)" => [
                    'data' => [
                        'id',
                        "answered (childId: {$child->id})",
                    ],
                ],
            ]
        );
        collect($stageQuery->json('data.stage.questions.data.*.answered'))
            ->map(function ($answered) {
                $this->assertFalse($answered);
            });

        // Contesta la primera pregunta.
        $this->mutation(
            'answer',
            [
                'input' => [
                    'childId' => $child->id,
                    'questionId' => $stage->questions()->first()->id,
                    'answerOptionId' => AnswerOption::inRandomOrder()->first()->id,
                ],
            ],
            [
                'id',
            ]
        );

        // Ahora todas las preguntas, menos la primera, no han sido contestadas.
        $stageQuery = $this->query(
            'stage',
            [
                'id' => $stage->id,
                'childId' => $child->id,
            ],
            [
                'id',
                "questions(childId: $child->id)" => [
                    'data' => [
                        'id',
                        "answered (childId: {$child->id})",
                    ],
                ],
            ]
        );
        collect($stageQuery->json('data.stage.questions.data.*.answered'))
            ->map(function ($answered, $idx) {
                if ($idx == 0) {
                    $this->assertTrue($answered);
                } else {
                    $this->assertFalse($answered);
                }
            });
    }

//    public function testStagePurchase()
//    {
//        $stage = Stage::whereHas('prices')->inRandomOrder()->first();
//        $ageRange = AgeRange::inRandomOrder()->first();
//        \Auth::setUser(User::first());
//        $child = (new UpsertChildMutation([
//            'name' => $this->faker->name,
//            'age' => $ageRange->min,
//            'gender' => 'male',
//        ]))->mutate();
//
//        // La etapa no está disponible.
//        $stageQuery = $this->query(
//            'stage',
//            ['id' => $stage->id],
//            [
//                'id',
//                "available(childId: {$child->id})",
//                'price' => [
//                    'id',
//                    'price',
//                    'perDay',
//                ],
//            ]
//        );
//        $this->assertArraySubset([
//            'id' => $stage->id,
//            'available' => false,
//            'price' => [
//                'price' => $stage->price->price,
//            ],
//        ], $stageQuery->json('data.stage'));
//
//        // El usuario compra la etapa para uno de sus niños, pero aún sigue
//        // NO disponible hasta que pague la compra.
//        $purchaseStageMutation = $this->mutation(
//            'purchaseStage',
//            [
//                'input' => [
//                    'stageId' => $stage->id,
//                    'childId' => $child->id,
//                ],
//            ],
//            [
//                'id',
//                "available(childId: {$child->id})",
//                "purchase(childId: {$child->id})" => [
//                    'id',
//                    'checkout' => [
//                        'id',
//                        'total',
//                        'status' => [
//                            'id',
//                            'slug',
//                        ],
//                    ],
//                ],
//            ]
//        );
//        $this->assertArraySubset([
//            'id' => $stage->id,
//            'available' => false,
//            'purchase' => [
//                'checkout' => [
//                    'status' => [
//                        'slug' => 'pending',
//                    ],
//                ],
//            ],
//        ], $purchaseStageMutation->json('data.purchaseStage'));
//
//        // El usuario realiza el pago a través de MercadoPago.
//        $payCheckoutWithMercadopagoMutation = $this->mutation(
//            'payCheckoutWithMercadopago',
//            [
//                'input' => [
//                    'checkoutId' => $purchaseStageMutation->json('data.purchaseStage.purchase.checkout.id'),
//                    'token' => 'TEST',
//                ],
//            ],
//            [
//                'id',
//            ]
//        );
//
//        // Ahora la etapa queda disponible y la factura en estado pagado.
//        $stageQuery = $this->query(
//            'stage',
//            ['id' => $stage->id],
//            [
//                'id',
//                "available(childId: {$child->id})",
//                "purchase(childId: {$child->id})" => [
//                    'checkout' => [
//                        'id',
//                        'status' => [
//                            'slug',
//                        ],
//                    ],
//                ],
//            ]
//        );
//        $this->assertArraySubset([
//            'id' => $stage->id,
//            'available' => true,
//            'purchase' => [
//                'checkout' => [
//                    'status' => [
//                        'slug' => 'paid',
//                    ],
//                ],
//            ],
//        ], $stageQuery->json('data.stage'));
//    }

}