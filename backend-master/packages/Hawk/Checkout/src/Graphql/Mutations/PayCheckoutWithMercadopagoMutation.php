<?php

namespace Hawk\Checkout\Graphql\Mutations;

use Hawk\Checkout\MercadoPago\Services\MPPayService;
use Hawk\Checkout\Models\Checkout;
use Hawk\Checkout\Models\Payment;
use Hawk\Checkout\Models\PaymentMethod;
use Hawk\LighthouseExtended\Support\Mutations\HkMutation;
use Illuminate\Database\Eloquent\Relations\Relation;

use Illuminate\Support\Facades\Log;
use MercadoPago;

class PayCheckoutWithMercadopagoMutation extends HkMutation
{

    public function authorize()
    {
        return true;
    }

    protected function setRules()
    {
        if (env('APP_ENV') === 'testing' && $this->input('token') === 'TEST') {
            $this->rules = [];
        } else {
            $this->rules = [
                'checkoutId' => [
                    'required',
                    'exists:checkouts,id',
                ],
                'email' => [
                    'required',
                    'email',
                ],
                'installments' => [
                    'required',
                ],
                'token' => [
                    'required',
                ],
                'paymentMethodId' => [
                    'required',
                ],
            ];
        }
    }

    public function mutate(): Payment
    {
        $checkout = Checkout::findOrFail($this->input('checkoutId'));

        if (env('APP_ENV') === 'testing' && $this->input('token') === 'TEST') {
            $amount = $checkout->getTotal();
        } else {
            $amount = $checkout->getTotal();
            MercadoPago\SDK::setAccessToken(env('MP_ACCESS_TOKEN'));

            $payment = new MercadoPago\Payment();

            $payment->transaction_amount = $amount;
            $payment->token = $this->input('token');
            $payment->description = $checkout->description;
            $payment->installments = $this->input('installments');
            $payment->payment_method_id = $this->input('paymentMethodId');
            $payment->payer = array(
                "email" => $this->input('email'),
            );
            $payment->save();

            Log::info(serialize($payment));


//            $paymentResponse = (new MPPayService())
//                ->payable($checkout)
//                ->token($this->input('token'))
//                ->installments($this->input('installments'))
//                ->email($this->input('email'))
//                ->paymentMethodId($this->input('paymentMethodId'))
//                ->amount($checkout->details()->sum('price'))
//                ->description($checkout->description)
//                ->pay()
//                ->getResponse();
//
//            $amount = 0; // TODO: Obtener `amount` de MercadoPago.
//
            if ($payment->status !== 201) {
                $this->addError('mp', 'unavailable', 'No se pudo procesar el pago. Por favor intentás más tarde');
                $this->failedValidation($this->validator);
            }
        }

        $payment = new Payment([
            'amount' => $amount,
            'extra_attributes' => [],
        ]);
        $payment->payable()->associate($checkout);
        $payment->paymentMethod()->associate(PaymentMethod::findByIdOrSlugOrFail('mercadopago'));
        $payment->via()->associate(me());
        $payment->save();

        if ($payment->amount >= $checkout->getTotal()) {
            $model = Relation::getMorphedModel($checkout->checkable_type);
            $model::paidHandler($payment);
        }

        return $payment;
    }

}