<?php

namespace Hawk\Checkout\Traits;

use Hawk\Checkout\Models\Payment;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait IsPayable
{

    /**
     * Devuelve la suma de todos los pagos realizados.
     * @return mixed
     */
    public function getTotalPaid()
    {
        return $this->payments()->sum('amount');
    }

    /** Relationships */

    public function payments(): MorphMany
    {
        return $this->morphMany(Payment::class, 'payable');
    }

}