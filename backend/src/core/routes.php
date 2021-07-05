<?php

use flashcards\exceptions\FileUploadException;
use flashcards\models\Answer;
use flashcards\models\Card;
use flashcards\models\Question;
use flashcards\models\Theme;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Routing\RouteCollectorProxy;

include 'utils.php';

return function (App $app): void {

    $app->group('/cards', function (RouteCollectorProxy $group) {

        $group->get('', function (Request $request, Response $response) {
            $cards = Card::with([
                'question',
                'question.answer'
            ])->get()->toJson();

            return sendOK($response, $cards);
        });

        $group->get('/{theme_id}', function (Request $request, Response $response, array $args) {
            $themeId = $args['theme_id'];
            $cards = Theme::find($themeId)->cards()->with([
                'question',
                'question.answer'
            ])->get();

            // we already have the theme id in the request param
            $cards->makeHidden(['theme_id']);

            $cards->toJson();

            return sendOK($response, $cards);
        });

        $group->get('/{theme_id}/{count}', function (Request $request, Response $response, array $args) {
            $themeId = $args['theme_id'];
            $count = $args['count'];

            $cards = Theme::find($themeId)->cards()->with([
                'question',
                'question.answer'
            ])->orderBy('score', 'DESC')->take($count)->get();

            // we already have the theme id in the request param
            $cards->makeHidden(['theme_id']);

            $cards->toJson();

            return sendOK($response, $cards);
        });

        $group->post('', function (Request $request, Response $response) {
            $jsonBody = $request->getParsedBody();

            try {
                Card::create(MAX_CARD_SCORE, intval($jsonBody[CARD_THEME]));
                Question::create($jsonBody[QUESTION_TEXT], $jsonBody[QUESTION_IMAGE]);
                Answer::create($jsonBody[ANSWER_TEXT], $jsonBody[ANSWER_IMAGE]);

                return sendOK($response);
            } catch (Exception $e) {
                return sendException($response, $e);
            }
        });

        $group->post('/{card_id}', function (Request $request, Response $response, array $args) {
            $cardId = $args['card_id'];
            $jsonBody = $request->getParsedBody();

            try {
                $hasChanged = false;

                if (isset($jsonBody[CARD_SCORE]) || isset($jsonBody[CARD_THEME])) {
                    Card::modify($cardId, $jsonBody[CARD_SCORE], $jsonBody[CARD_THEME]);
                    $hasChanged = true;
                }
                if (isset($jsonBody[QUESTION_TEXT]) || isset($jsonBody[QUESTION_IMAGE])) {
                    Question::modify($cardId, $jsonBody[QUESTION_TEXT], $jsonBody[QUESTION_IMAGE]);
                    $hasChanged = true;
                }
                if (isset($jsonBody[ANSWER_TEXT]) || isset($jsonBody[ANSWER_IMAGE])) {
                    Answer::modify($cardId, $jsonBody[ANSWER_TEXT], $jsonBody[ANSWER_IMAGE]);
                    $hasChanged = true;
                }

                return $hasChanged ? sendOK($response) : sendError($response, errorJson('At least one parameters must be declared'));
            } catch (Exception $e) {
                return sendException($response, $e);
            }
        });

        $group->delete('/{card_id}', function (Request $request, Response $response, array $args) {
            $cardId = $args['card_id'];
            $isDestroyed = Card::destroy($cardId) == 1;

            return $isDestroyed ? sendOK($response) : sendError($response, errorJson('No matching card'));
        });
    });

    $app->group('/themes', function (RouteCollectorProxy $group) {

        $group->get('', function (Request $request, Response $response) {
            $themes = Theme::all()->toJson();

            return sendOK($response, $themes);
        });

        $group->post('', function (Request $request, Response $response) {
            $jsonBody = $request->getParsedBody();

            try {
                Theme::create($jsonBody[THEME_NAME], $jsonBody[THEME_IMAGE]);

                return sendOK($response);
            } catch (Exception $e) {
                return sendException($response, $e);
            }
        });

        $group->post('/{theme_id}', function (Request $request, Response $response, array $args) {
            try {
                $jsonBody = $request->getParsedBody();

                Theme::modify($args['theme_id'], $jsonBody[THEME_NAME], $jsonBody[THEME_IMAGE]);

                return sendOK($response);
            } catch (Exception $e) {
                return sendException($response, $e);
            }
        });

        $group->delete('/{theme_id}', function (Request $request, Response $response, array $args) {
            $themeId = $args['theme_id'];
            $isDestroyed = Theme::destroy($themeId) == 1;

            return $isDestroyed ? sendOK($response) : sendError($response, errorJson('No matching theme'));
        });
    });

    $app->post('/images', function (Request $request, Response $response) {
        $uploadedFiles = $request->getUploadedFiles();

        try {
            $imageFileName = saveImageIfExists($uploadedFiles);

            return sendOK($response, json_encode(['success' => true, 'path' => $imageFileName]));
        } catch (FileUploadException $e) {
            return sendException($response, $e);
        }
    });
};

function sendOK(Response $response, string $body = TRUE_RESULT): Response
{
    $response->getBody()->write($body);
    return $response->withStatus(200);
}

function sendError(Response $response, string $body = FALSE_RESULT): Response
{
    $response->getBody()->write($body);
    return $response->withStatus(400);
}

function sendException(Response $response, Exception $exception): Response
{
    $response->getBody()->write(errorJson($exception->getMessage()));
    return $response->withStatus(400);
}
