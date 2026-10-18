<?php

namespace App\Modules\Child\Graphql\Mutations;

use App\Modules\Child\Models\Child;
use App\Modules\Question\Models\AgeRange;
use Cake\Chronos\Chronos;
use Hawk\LighthouseExtended\Support\Mutations\HkMutation;
use Illuminate\Support\Facades\Storage;

class UpsertChildMutation extends HkMutation
{
    public function authorize(): bool
    {
        return me() != null;
    }

    public function setRules(): void
    {
        $this->rules = [
            'name' => [
                'required',
            ],
            'birthdate' => [
                'required',
                'date',
            ],
            'gender' => [
                'required',
                'in:male,female',
            ],
        ];

        if (! $this->isCreating()) {
            $this->mergeRules([
                'id' => [
                    'required',
                    'exists:children,id',
                ],
            ]);
        }
    }

    public function moreValidation()
    {
        $minLlimit = Chronos::now()->subYears(8);
        $maxLlimit = Chronos::now()->subYears(1);

        if (Chronos::parse($this->input('birthdate'))->lt($minLlimit)) {
            $this->addError(
                'birthdate',
                'max',
                'Sólo puedes agregar niñ@s de hasta 8 años'
            );
        } elseif (Chronos::parse($this->input('birthdate'))->gt($maxLlimit)) {
            $this->addError(
                'birthdate',
                'max',
                'Sólo puedes agregar niñ@s de al menos 1 año'
            );
        }
    }

    public function mutate(): Child
    {
        $birthdate = Chronos::parse($this->input('birthdate'));
        $age = $birthdate->diffInYears(Chronos::now());

        if ($age < 2) {
            $ageRange = AgeRange::whereMinAndMax(1, 2)->firstOrFail();
        } elseif ($age < 3) {
            $ageRange = AgeRange::whereMinAndMax(2, 3)->firstOrFail();
        } elseif ($age < 4) {
            $ageRange = AgeRange::whereMinAndMax(3, 4)->firstOrFail();
        } elseif ($age < 5) {
            $ageRange = AgeRange::whereMinAndMax(4, 5)->firstOrFail();
        } elseif ($age < 6) {
            $ageRange = AgeRange::whereMinAndMax(5, 6)->firstOrFail();
        } elseif ($age < 7) {
            $ageRange = AgeRange::whereMinAndMax(6, 7)->firstOrFail();
        } elseif ($age) {
            $ageRange = AgeRange::whereMinAndMax(7, 8)->firstOrFail();
        }

        if ($age <= 1) {
            $picture = Storage::disk('public')->url('children-picture/baby.svg');
        } else {
            $picture = $this->input('gender') == 'male' ? Storage::disk('public')->url('children-picture/boy.png') : Storage::disk('public')->url('children-picture/girl.png');
        }

        $child = Child::updateOrCreate(
            ['id' => $this->input('id')],
            [
                'name' => $this->input('name'),
                'birthdate' => $birthdate->toDateString(),
                'gender' => $this->input('gender'),
                'user_id' => me()->id,
                'ageRange_id' => $ageRange->id,
                'picture' => $picture,
            ]
        );

        return $child;
    }
}