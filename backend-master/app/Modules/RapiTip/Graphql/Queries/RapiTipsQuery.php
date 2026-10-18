<?php

namespace App\Modules\RapiTip\Graphql\Queries;

use Illuminate\Support\Arr;

class RapiTipsQuery
{

    public function handle($root, array $args)
    {
        return me()
            ->rapiTips()
            ->hkPaginate(Arr::get($args, 'page'));
    }

}