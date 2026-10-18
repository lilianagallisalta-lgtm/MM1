<?php

namespace Hawk\PromotionCode\Graphql\Queries;

use Hawk\LighthouseExtended\Exceptions\HkGraphqlError;
use Hawk\PromotionCode\Models\PromotionCode;

class PromotionCodeQuery
{

    public function promotionCode($root, array $args): ?PromotionCode
    {
        if (optional(me())->hasRole('admin')) {
            $promotionCode = PromotionCode::find(array_get($args, 'id'));
            if ($promotionCode) {
                return $promotionCode;
            }
        }

        if (! array_get($args, 'code')) {
            return null;
        }

        $promotionCode = PromotionCode::onlyActives()
            ->where('code', '=', trim(strtoupper(array_get($args, 'code'))))
            ->first();

        if (! $promotionCode) {
            // Las agencias no pueden utilizar códigos de promoción.
            throw new HkGraphqlError('El Código de Promoción es inválido o ya ha finalizado');
        }

        return $promotionCode;
    }

     public function promotionCodes($root, array $args)
    {
        return PromotionCode::query()
            ->when(array_get($args, 'withoutTrashed') === false, function ($query) {
                return $query->withTrashed();
            })
            ->when(array_get($args, 'onlyActives') === true, function ($query) {
                return $query->onlyActives();
            })
            ->when(array_get($args, 'code'), function ($query, $code) {
                return $query->where('code', 'like', "%{$code}%");
            })
            ->orderBy('promotionCodes.start')
            ->hkPaginate(array_get($args, 'page'));
    }

}
