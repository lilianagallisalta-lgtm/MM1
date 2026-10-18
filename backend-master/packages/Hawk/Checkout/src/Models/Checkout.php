<?php

namespace Hawk\Checkout\Models;

use App\Modules\Car\Events\CarReservationPaidEvent;
use Hawk\Checkout\Traits\IsPayable;
//use App\Modules\Package\Events\PackageReservationPaidEvent;
use Hawk\Support\Database\Eloquent\HkModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Spatie\ModelStatus\HasStatuses;
use Spatie\Translatable\HasTranslations;

class Checkout extends HkModel
{
    use IsPayable,
        HasStatuses,
        HasTranslations;

    static $resourceType = 'checkouts';
    protected $table = 'checkouts';

    protected $fillable = [
        'description',
        'paymentMethod_id',
        'checkable_type',
        'checkable_id',
    ];

    protected $casts = [];

    protected $attributes = [];

    public $translatable = [
        'description',
    ];

    /** Utils */

    /**
     * Devuelve la suma total de los precios de cada detalle.
     * @return mixed
     */
    public function getTotal()
    {
        return $this->details()->sum('price');
    }

    public function getBalance()
    {
        return $this->getTotal() - $this->getTotalPaid();
    }

    public function paidHandler(Payment $payment)
    {
        switch ($this->checkable_type) {
            case 'cars':
                (new CarReservationPaidEvent($payment))->handle();

                break;
        }
    }

    /** Relationships */

    public function details(): HasMany
    {
        return $this->hasMany(CheckoutDetail::class);
    }

    public function paymentMethod(): BelongsTo
    {
        return $this->belongsTo(PaymentMethod::class, 'paymentMethod_id');
    }

    public function checkable(): MorphTo
    {
        return $this->morphTo('checkable');
    }
}
