<?php

use Slim\Factory\AppFactory;

require_once __DIR__ . '/vendor/autoload.php';

session_start();

flashcards\config\Database::connect();

$app = AppFactory::create();
$app->setBasePath('/api');

/**
 * Dev. mode to show errors in details
 */
$app->addErrorMiddleware(true, true, false);

$middleware = require __DIR__ . '/src/core/middleware.php';
$middleware($app);

$routes = require __DIR__ . '/src/core/routes.php';
$routes($app);

$app->run();
