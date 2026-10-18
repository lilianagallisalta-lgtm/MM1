<?php

namespace App\Modules\Question\Graphql\Mutations;

use App\Modules\Question\Models\Question;
use Hawk\LighthouseExtended\Support\Mutations\HkMutation;

class QuestionUpsertMutation extends HkMutation
{
    public function authorize()
    {
        return true;
    }

    public function setRules()
    {
        $this->rules = [
            'display' => [
                'es_AR' => [
                    'required',
                ],
            ],
            'stageId' => [
                'required',
                'exists:stages,id',
            ],
            'ageRangeId' => [
                'required',
                'exists:agesRanges,id',
            ],
            'areaId' => [
                'required',
                'exists:areas,id',
            ],
            'subareaId' => [
                'required',
                'exists:subareas,id',
            ],
        ];
    }

    public function mutate(): Question
    {
        return Question::create([
            'display' => $this->input('display'),
            'stage_id' => $this->input('stageId'),
            'ageRange_id' => $this->input('ageRangeId'),
            'area_id' => $this->input('areaId'),
            'subarea_id' => $this->input('subareaId'),
            'extra_attributes' => json_encode(array_only($this->input('extra_attributes'), [
                'idx',
            ])),
        ]);
    }
}