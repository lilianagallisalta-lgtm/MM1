<?php

namespace App\Modules\Question\Graphql\Queries;

use App\Modules\Child\Models\Child;
use App\Modules\Child\Rules\UserCanSeeChild;
use App\Modules\Question\Models\Question;
use Hawk\LighthouseExtended\Exceptions\HkGraphqlError;
use Illuminate\Support\Arr;

class QuestionQuery
{

    public function handle($root, array $args): ?Question
    {
        $child = Child::whereUuid(Arr::get($args, 'childId'))->first();
        if (! (new UserCanSeeChild(me()))->passes('childId', $child->id)) {
            throw new HkGraphqlError(___('No puedes ver a est@ niñ@'));
        };
        $question =  Question::findOrFail(array_get($args, 'id'));
        $question->display = str_replace('#Nombreniñ@', title_case($child->name), $question->display);
        return $question;
    }

//    public function answerOption(Question $root, array $args)
//    {
//        $child = Child::query()
//            ->with([
//                'answers' => function ($query) use ($root) {
//                    return $query->where('answers.question_id', '=', $root->id);
//                }
//            ])
//            ->findOrFail(array_get($args, 'childId'));
//
//        $answer = $child->answers()
//            ->where('answers.question_id', '=', $root->id)
//            ->first();
//
//        return optional($answer)->answerOption;
//    }

}