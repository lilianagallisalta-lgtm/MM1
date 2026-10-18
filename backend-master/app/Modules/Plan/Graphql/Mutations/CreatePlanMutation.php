<?php

namespace App\Modules\Plan\Graphql\Mutations;

use App\Modules\Child\Models\Child;
use App\Modules\Child\Rules\UserCanSeeChild;
use App\Modules\Plan\Models\Plan;
use App\Modules\Plan\Rules\ChildCanCreateNewPlan;
use Hawk\LighthouseExtended\Support\Mutations\HkMutation;

class CreatePlanMutation extends HkMutation
{

    public function authorize()
    {
        return true;
    }

    public function setRules()
    {
        $this->rules = [
            'childId' => [
                'required',
            ],
        ];
    }

    public function prepareForValidation()
    {
        (new UserCanSeeChild(me()))->passes('childId', $this->input('childId'));

        (new ChildCanCreateNewPlan())->passes('childId', $this->input('childId'));
    }

    public function mutate(): Plan
    {
        $child = Child::whereUuid($this->input('childId'))->first();
        $idx = $child->plans()->count() + 1;
        return $child->plans()->create([
            'idx' => $idx,
            'ageRange_id' => $child->ageRange->id,
        ]);
    }

}