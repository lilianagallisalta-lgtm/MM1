<?php

namespace Hawk\Checkout\MercadoPago\Services;

use MP;

class MPPayService
{

    private $mp;
    private $payable;
    private $token;
    private $installments = 1;
    private $amount;
    private $email;
    private $paymentMethodId;
    private $paymentData;
    private $response;
    private $description;

    public function __construct()
    {
        $this->mp = new MP(env('MP_ACCESS_TOKEN'));
        $this->mp->sandbox_mode(env('MP_SANDBOX_MODE'));
    }

    public function payable($payable)
    {
        $this->payable = $payable;
        return $this;
    }

    public function token($token)
    {
        $this->token = $token;
        return $this;
    }

    public function installments($installments)
    {
        $this->installments = $installments;
        return $this;
    }

    public function amount($amount)
    {
        $this->amount = $amount;
        return $this;
    }

    public function email($email)
    {
        $this->email = $email;
        return $this;
    }

    public function paymentMethodId($paymentMethodId)
    {
        $this->paymentMethodId = $paymentMethodId;
        return $this;
    }

    public function description($description)
    {
        $this->description = $description;
        return $this;
    }

    public function pay()
    {
        $this->paymentData = [
            'transaction_amount' => (float) $this->amount,
            'token' => $this->token,
            'description' => $this->description,
            'payer' => [
                'email' => $this->email,
            ],
            'installments' => $this->installments,
            'payment_method_id' => $this->paymentMethodId,
        ];

//        dd($this->paymentData);

        $this->response = $this->mp->post('/v1/payments', $this->paymentData);

        return $this;
    }

    public function getResponse()
    {
        return $this->response;
    }

}