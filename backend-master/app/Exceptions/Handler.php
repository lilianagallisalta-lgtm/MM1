<?php

namespace App\Exceptions;

use Exception;
use GraphQL\Error\InvariantViolation;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\UnauthorizedException;
use Nuwave\Lighthouse\Support\Exceptions\DirectiveException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception $exception
     *
     * @return void
     * @throws Exception
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
//        dd($exception);

        if (method_exists($exception, 'render')) {
            // Si la misma excepción implementa el método `render`, se usa
            // ese método.

            return parent::render($request, $exception);
        }

        if (
            $exception instanceof DirectiveException
            || $exception instanceof InvariantViolation
        ) {
            return response()->json($exception->getMessage(), 500);
        }

        if ($exception instanceof NotFoundHttpException) {
            return response()->json([
                'message' => 'NOT FOUND [' . request()->method() . '] ' . request()->url(),
                'url' => request()->url(),
            ], 404);
        }

        if ($exception instanceof UnauthorizedHttpException
            || $exception instanceof UnauthorizedException) {
            return response()->json([
                'message' => 'Unauthorized route: ' . request()->route()->uri(),
                'url' => request()->url(),
            ], 401);
        }

        $trace = $exception->getTrace();
        $appTrace = collect();

        foreach ($trace as $t) {
            if (! isset($t['file'])) {
                continue;
            }

            $file = $t['file'];

            if (starts_with($file,base_path() . '/app/')) {
                $appTrace->push($t);
            }
        }

        $statusCode = 'unknown';
        if (method_exists($exception, 'getStatusCode')) {
            $statusCode = $exception->getStatusCode();
        }

        $exceptionClass = get_class($exception);

        $exceptionNamespace = substr($exceptionClass, 0, strrpos($exceptionClass, '\\'));

        if (isLocal()) {
            $exception = [
                'message' => $exception->getMessage(),
                'class' => class_basename($exceptionClass),
                'namespace' => $exceptionNamespace,
                'file' => str_after($exception->getFile(), base_path()),
                'line' => $exception->getLine(),
                'statusCode' => $statusCode,
                'appTrace' => $appTrace,
                'trace' => $exception->getTrace(),
                'query' => $request->all(),
            ];
        } else {
            $exception = [
                'message' => $exception->getMessage(),
                'statusCode' => $statusCode,
            ];
        }

        return response()->json($exception, 500);
    }
}
