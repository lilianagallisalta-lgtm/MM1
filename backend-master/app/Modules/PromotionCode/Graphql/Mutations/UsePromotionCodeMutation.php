<?php

namespace App\Modules\PromotionCode\Graphql\Mutations;

use App\Modules\Child\Models\Child;
use App\Modules\Child\Rules\ChildHasActiveLicense;
use App\Modules\Child\Rules\UserCanSeeChild;
use Cake\Chronos\Chronos;
use Hawk\LighthouseExtended\Support\Mutations\HkMutation;
use Hawk\PromotionCode\Graphql\Queries\PromotionCodeQuery;
use Hawk\Stock\Events\StockSubsctracted;
use Illuminate\Support\Str;

class UsePromotionCodeMutation extends HkMutation
{

    protected $i18nKey = 'promotionCode.mutation.usePromotionCode';
    protected $child;
    protected $promotionCode;

    public function authorize()
    {
        return me() != null;
    }

    public function setRules()
    {
        $this->rules = [
            'childId' => [
                'required',
            ],
            'code' => [
                'required',
            ],
        ];
    }

    public function moreValidation()
    {
        $this->child = Child::whereUuid($this->input('childId'))->firstOrFail();
        (new UserCanSeeChild(me()))->passes('childId', $this->child->id);

        try {
            $this->promotionCode = (new PromotionCodeQuery())->promotionCode(null, ['code' => $this->input('code')]);
        } catch (\Exception $e) {
            $this->addError('code', 'exists', 'El código es inválido o ya ha caducado');
        }

        if ((new ChildHasActiveLicense())->passes('childId', $this->child->id)) {
            $this->addError(
                'license',
                'exists',
                __('Tu niñ@ ya tiene una licencia activa')
            );
        }
    }

    public function mutate()
    {
        event(new StockSubsctracted($this->promotionCode->stock->id, 1));

        return $this->child->licenses()->create([
            'uuid' => (string) Str::uuid(),
            'expires_at' => Chronos::now()->addYear()->endOfDay()->toDateTimeString(),
        ]);
    }

}