<?php

namespace App\Modules\Checkout\Graphql\Queries;

use Carbon\Carbon;
use Hawk\Modules\Checkout\Models\Checkout;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CheckoutQuery
{
    public function checkout($root, array $args)
    {
        $checkout = Checkout::where('code', '=', strtoupper($args['code']))->firstOrFail();

        if (Carbon::now()->gt($checkout->to) && ! optional(me())->hasRole('sadmin')) {
            throw (new ModelNotFoundException)->setModel(Checkout::class);
        }

        return $checkout;
    }
}