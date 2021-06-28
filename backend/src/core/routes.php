<?php

use flashcards\models as Models;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;

return function (App $app): void {

    $app->get('/cards/create', function (Request $request, Response $response) {
        $answer = new Models\Answer();
        $answer->text = generateRandomString();
        $answer->save();

        $question = new Models\Question();
        $question->text = generateRandomString();
        $question->save();

        $card = new Models\Card();
        $card->score = random_int(0, 6);
        $card->theme = random_int(1, 2);
        $card->save();

        $response->getBody()->write($card->toJson());

        return $response;
    });

    $app->get('/cards/list', function (Request $request, Response $response) {
        $cards = Models\Card::all()->toJson();
        $response->getBody()->write($cards);

        return $response;
    });

    $app->get('/cards/list/{theme}', function (Request $request, Response $response, array $args) {
        $themeId = $args['theme'];

        $cards = Models\Theme::with('cards')->get();
//        ->question; // WTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF

//        ->get()
//        ->toJson();
        $response->getBody()->write($cards);

        return $response;
    });


    $app->get('/', function (Request $request, Response $response, array $args) {
        $string = Models\Theme::all()->toJson();
        $response->getBody()->write($string);

        return $response;
    });
};
