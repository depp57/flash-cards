<?php

use Slim\App;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Psr7\Stream;

return function (App $app): void {

    $app->add(function (Request $request, RequestHandlerInterface $handler) {
        $response = $handler->handle($request);

        // Compress response data
        $deflateContext = deflate_init(ZLIB_ENCODING_GZIP);
        $compressed = deflate_add($deflateContext, (string)$response->getBody(), \ZLIB_FINISH);

        $stream = fopen('php://memory', 'r+');
        fwrite($stream, $compressed);
        rewind($stream);

        $response = $response->withAddedHeader('Content-Type', 'application/json');
        $response = $response->withAddedHeader('Content-Encoding', 'gzip');
        $response = $response->withAddedHeader('Content-Length', strlen($compressed));
        $response = $response->withAddedHeader('Access-Control-Allow-Methods', '*');
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        $response = $response->withAddedHeader('Access-Control-Allow-headers', '*');

        return $response
            ->withBody(new Stream($stream));
    });
};
