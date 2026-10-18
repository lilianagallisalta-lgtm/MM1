<?php

namespace Hawk\Checkout\Database\Seeds;

use Hawk\Checkout\Models\PaymentMethod;
use Illuminate\Support\Facades\Storage;

class CheckoutModuleSeeder extends \Illuminate\Database\Seeder
{
    public function run()
    {
        PaymentMethod::create([
            'slug' => 'mercadopago',
            'name' => [
                'es_AR' => 'MercadoPago',
            ],
            'description' => [
                'es_AR' => 'Pagar ahora online (5% de descuento)',
            ],
            'picture' => Storage::disk('payment-methods-pictures')->url('mercadopago.png'),
            'charge' => '-0.05',
        ]);
    }
}