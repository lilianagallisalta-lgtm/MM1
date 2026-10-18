<?php

namespace App\Modules\License\Graphql\Mutations;

use App\Modules\Child\Models\Child;
use App\Modules\Child\Rules\ChildHasActiveLicense;
use App\Modules\License\Models\License;
use Cake\Chronos\Chronos;
use Hawk\LighthouseExtended\Support\Mutations\HkMutation;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use MercadoPago;

class PurchaseLicenseMutation extends HkMutation
{

    protected $me;
    protected $child;

    public function authorize()
    {
        $this->me = me();
        return $this->me !== null;
    }

    public function setRules()
    {
        $this->rules = [
            'childId' => [
                'required',
//                'exists:children,id',
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

    public function moreValidation()
    {
        $this->child = Child::whereUuid($this->input('childId'))->first();
        if ((new ChildHasActiveLicense())->passes('childId', $this->child->id)) {
            $this->addError(
                'license',
                'exists',
                __('Tu niñ@ ya tiene una licencia activa')
            );
        }
    }

    public function mutate(): License
    {
        $amount = 200;
        MercadoPago\SDK::setAccessToken(env('MP_ACCESS_TOKEN'));

        if (env('APP_ENV') === 'testing' && $this->input('token') === 'TEST') {
        } else {
            $payment = new MercadoPago\Payment();
            $payment->transaction_amount = $amount;
            $payment->token = $this->input('token');
            $payment->description = "Licencia para {$this->child->name} en MentesMejorando.com";
            $payment->installments = $this->input('installments');
            $payment->payment_method_id = $this->input('paymentMethodId');
            $payment->payer = [
                'email' => $this->me->email,
            ];
            $payment->save();

            Log::info(serialize($payment));
            Log::info('mp', [
                'status' => $payment->status,
            ]);

            if ($payment->status !== 'approved') {
                $this->addError(
                    'mercadopago',
                    'unavailable',
                    __('No se pudo procesar el pago. Por favor intentás más tarde')
                );
                $this->failedValidation($this->validator);
            }
        }

        return $this->child->licenses()->create([
            'uuid' => (string) Str::uuid(),
            'expires_at' => Chronos::now()->addYear()->endOfDay()->toDateTimeString(),
        ]);
    }

}