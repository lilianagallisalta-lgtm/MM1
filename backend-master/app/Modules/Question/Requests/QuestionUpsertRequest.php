<?php

namespace App\Modules\Question\Requests;

use App\Modules\Question\Models\AgeRange;
use App\Modules\Question\Models\Area;
use App\Modules\Question\Models\Question;
use Hawk\Support\Requests\HkActionRequest;

class QuestionUpsertRequest extends HkActionRequest
{
    protected $question;

    protected $area;

    protected $ageRange;

    public function authorize()
    {
        return true;
    }

    public function setRules()
    {
        $this->rules = [
            'level' => [
                'required',
                'numeric',
            ],
            'display' => [
                'es_AR' => [
                    'required',
                ],
            ],
        ];

//        $this->foreachLocale('display', [
//            'required',
//        ]);

//        $this->foreachLocale('body', [
//            'required',
//        ]);
    }

    public function area(Area $area)
    {
        $this->area = $area;
        return $this;
    }

    public function ageRange(AgeRange $ageRange)
    {
        $this->ageRange = $ageRange;
        return $this;
    }

    public function upsert()
    {
        $this->validateIfNotYet();

        $this->area = $this->area ?? Area::findOrFail($this->input('area_id'));

        $this->ageRange = $this->ageRange ?? Area::findOrFail($this->input('ageRange_id'));

        $this->question = new Question([
            'display' => $this->input('display'),
            'level' => $this->input('level'),
        ]);
        $this->question->area()->associate($this->area);
        $this->question->ageRange()->associate($this->ageRange);
        $this->question->save();

        return $this->question;
    }

//    public function moreValidation($validator)
//    {
//        $validator->after(function ($validator) {
//            $validator->errors()->add("key", [
//                'rule' => 'required',
//                'message' => ___('{{moduleSingular}}.requests.put.key.required'),
//            ]);
//        });
//    }
}