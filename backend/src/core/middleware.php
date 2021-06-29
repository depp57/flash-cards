<?php

use Slim\App;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;

return function (App $app): void {

    $app->add(function (Request $request, RequestHandlerInterface $handler) {
        $response = $handler->handle($request);
        return $response->withAddedHeader('Content-Type', 'application/json');
    });
};
