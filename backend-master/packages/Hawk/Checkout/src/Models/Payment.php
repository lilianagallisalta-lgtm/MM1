<?php

namespace Hawk\Checkout\Models;

use Hawk\Support\Database\Eloquent\HkModel;
use Hawk\Support\Database\Eloquent\Traits\HasSchemalessAttributes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Spatie\Translatable\HasTranslations;

class Payment extends HkModel
{

    use HasSchemalessAttributes,
        HasTranslations;

    static $resourceType = 'payments';
    protected $table = 'payments';

    protected $fillable = [
        'amount',
        'extra_attributes',
        'payable_type',
        'payable_id',
        'paymentMethod_id',
    ];

    protected $casts = [
        'extra_attributes' => 'array',
    ];

    protected $attributes = [
        'extra_attributes' => '{}',
    ];

    public $translatable = [
    ];

    /** Relationships */

    /**
     * El `resource` ha sido pagado.
     * @return MorphTo
     */
    public function payable(): MorphTo
    {
        return $this->morphTo('payable');
    }

    /**
     * Lo que hizo posible que se reciba el pago: una persona, un servicio, etc.
     * @return MorphTo
     */
    public function via(): MorphTo
    {
        return $this->morphTo('via');
    }

    /**
     * Método de pago utilizado.
     * @return BelongsTo
     */
    public function paymentMethod(): BelongsTo
    {
        return $this->belongsTo(PaymentMethod::class, 'paymentMethod_id');
    }

}
