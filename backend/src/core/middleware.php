<?php

use Slim\App;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;

return function (App $app): void {

    $app->add(function (Request $request, RequestHandlerInterface $handler) {
        $response = $handler->handle($request);
        $response = $response->withAddedHeader('Content-Type', 'application/json');
        $response = $response->withAddedHeader('Access-Control-Allow-Methods', '*');
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        $response = $response->withAddedHeader('Access-Control-Allow-headers', '*');

        return $response;
    });
};
