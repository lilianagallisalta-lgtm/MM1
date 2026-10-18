<?php

namespace App\Modules\RapiTip\Graphql\Queries;

use App\Modules\RapiTip\Models\RapiTip;
use Illuminate\Support\Arr;

class RapiTipQuery
{

    public function handle($root, array $args)
    {
        $rapiTip = RapiTip::whereUuid(Arr::get($args, 'id'))->firstOrFail();

        if (! me()->rapiTips()->pluck('rapiTips.id')->contains($rapiTip->id)) {
            return null;
        }

        return $rapiTip;
    }

}