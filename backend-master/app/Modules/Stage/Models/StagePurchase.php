<?php
//
//namespace App\Modules\Stage\Models;
//
//use Hawk\Checkout\Models\Checkout;
//use Hawk\Checkout\Models\Payment;
//use Hawk\Support\Database\Eloquent\HkModel;
//use Illuminate\Database\Eloquent\Relations\BelongsToMany;
//
//class StagePurchase extends HkModel
//{
//
//    protected $table = 'stagesPurchases';
//
//    protected $fillable = [
//        'stage_id',
//        'child_id',
//    ];
//
//    protected $casts = [];
//
//    protected $attributes = [];
//
//    /** Hawk/Checkout */
//
//    public static function paidHandler(Payment $payment)
//    {
//        return $payment->payable->setStatus('paid', 'Pagada');
//    }
//
//    /** Utils */
//
//    public function getCheckout(): ?Checkout
//    {
//        return $this->checkout;
//    }
//
//    /** Relationships */
//
//    public function checkout(): BelongsToMany
//    {
//        return $this->belongsToMany(Checkout::class, 'checkout_stagePurchase', 'stagePurchase_id')
//            ->expectOne();
//    }
//
//}
