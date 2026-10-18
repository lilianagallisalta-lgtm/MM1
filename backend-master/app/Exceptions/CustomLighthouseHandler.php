<?php

namespace App\Exceptions;

use GraphQL\Error\Error;
use Nuwave\Lighthouse\Exceptions\RendersErrorsExtensions;
use Nuwave\Lighthouse\Execution\ErrorHandler;

/**
 * Handle Exceptions that implement Nuwave\Lighthouse\Exceptions\RendersErrorsExtensions
 * and add extra content from them to the 'extensions' key of the Error that is rendered
 * to the User.
 */
class CustomLighthouseHandler implements ErrorHandler
{
    public static function handle(Error $error, \Closure $next): array
    {
        $underlyingException = $error->getPrevious();

        if($underlyingException && $underlyingException instanceof RendersErrorsExtensions) {
            $extensionsContent = $underlyingException->extensionsContent();

            $keys = array_get($extensionsContent, 'validation');
            // La excepción `HkMutationException` inserta los errores en `validation.errors`.
            // La de lighthouse, no. Por lo tanto, si NO tiene la key `validation.errors`
            // quiere decir que es la excepción de Lighthouse y la transforma para que
            // sea igual que `HkMutationException`.
            // TODO: Esto se debería modificar, guiarse sólo por la key `validation.errors` no da.
            if (! array_get($keys, 'errors')) {
                $field = array_first($error->getPath());

                $customErrors = collect($keys)
                    ->map(function ($errors) use ($field) {
                        return collect($errors)
                            ->map(function ($error) use ($field) {
                                $message = ___($field . '.' . $error);

                                return [
                                    'rule' => $error,
                                    'message' => $message,
                                ];
                            });
                    });

                $extensionsContent = array_merge($underlyingException->extensionsContent(), [
                    'validation' => [
                        'errors' => $customErrors,
                    ],
                ]);
            }

            // Reconstruct the error, passing in the extensions of the underlying exception
            $error = new Error(
                $error->message,
                $error->nodes,
                $error->getSource(),
                $error->getPositions(),
                $error->getPath(),
                $underlyingException,
                // TODO remove this wrapping as we switch to the new version of webonyx/graphql-php
                // The underlying issue is already resolved there. For now, this fix will do
                // and make sure we return a spec compliant error.
                // https://github.com/webonyx/graphql-php/commit/f4008f0fb2294178fc0ecc3f7a7f71a13b543db1
                ['extensions' => $extensionsContent]
            );
        }

        return $next($error);
    }
}
