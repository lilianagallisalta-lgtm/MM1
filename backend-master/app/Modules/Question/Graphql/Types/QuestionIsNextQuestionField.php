<?php

namespace App\Modules\Question\Graphql\Types;


use App\Modules\Child\Models\Child;
use App\Modules\Question\Graphql\Queries\NextQuestionQuery;
use App\Modules\Question\Models\Question;
use Illuminate\Support\Arr;

class QuestionIsNextQuestionField
{

    public function handle(Question $root, array $args): bool
    {
//        $child = Child::query()
//            ->ofMe()
//            ->findOrFail(Arr::get($args, 'childId'));
//
//        $nextQuestion = (new NextQuestionQuery())->handle(null, [
//            'stageId' => $root->stage->id,
//            'childId' => $child->id,
//        ]);
//
//        return $root->id == optional($nextQuestion)->id;
    }

}