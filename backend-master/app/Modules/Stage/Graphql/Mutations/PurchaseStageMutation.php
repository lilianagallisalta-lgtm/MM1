<?php
//
//namespace App\Modules\Stage\Graphql\Mutations;
//
//use App\Modules\Child\Models\Child;
//use App\Modules\Stage\Models\Stage;
//use App\Modules\Stage\Models\StagePurchase;
//use Hawk\LighthouseExtended\Support\Mutations\HkMutation;
//use Hawk\Checkout\Models\Checkout;
//use Hawk\Checkout\Models\Payment;
//use Hawk\Checkout\Models\PaymentMethod;
//
//class PurchaseStageMutation extends HkMutation
//{
//
//    public function authorize()
//    {
//        return me() != null;
//    }
//
//    protected function setRules()
//    {
//        $this->rules = [
//            'stageId' => [
//                'required',
//                'exists:stages,id',
//            ],
//            'childId' => [
//                'required',
//                'exists:children,id',
//            ],
//        ];
//    }
//
//    public function mutate(): Stage
//    {
//        $stage = Stage::findByIdOrSlugOrFail($this->input('stageId'));
//        $child = Child::findOrFail($this->input('childId'));
//
//        $stagePurchase = StagePurchase::firstOrCreate([
//            'stage_id' => $stage->id,
//            'child_id' => $child->id,
//        ]);
//
//        if ($stagePurchase->wasRecentlyCreated) {
//            $checkout = Checkout::create([
//                'description' => 'Acceso a ' . $stage->display . ' en MentesMejorando.com',
//                'paymentMethod_id' => PaymentMethod::findByIdOrSlugOrFail('mercadopago')->id,
//                'checkable_type' => 'stagesPurchases',
//                'checkable_id' => $stagePurchase->id,
//            ]);
//            $checkout->setStatus('pending', 'Pendiente de pago');
//
////        $payment = new Payment([
////            'amount' => $stage->price->price,
////            'extra_attributes' => [
////                'comments' => $this->input('comments'),
////            ],
////        ]);
////        $payment->payable()->associate($checkout);
////        $payment->paymentMethod()->associate(PaymentMethod::whereSlug('location')->first());
////        $payment->via()->associate(me());
////        $payment->save();
//
//            $stagePurchase->checkout()->attach($checkout);
//        }
//
//        return $stage;
//    }
//
//}