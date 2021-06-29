<?php

use flashcards\exceptions\DatabaseException;
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

    $app->group('/card/', function (RouteCollectorProxy $group) {

        $group->get('list', function (Request $request, Response $response) {
            $cards = Card::all()->toJson();

            return sendResponse($response, $cards);
        });

        $group->get('list/{theme_id}', function (Request $request, Response $response, array $args) {
            $themeId = $args['theme_id'];
            $cards = Theme::find($themeId)->cards;

            return sendResponse($response, $cards);
        });

        $group->post('create', function (Request $request, Response $response) {
            $uploadedFiles = $request->getUploadedFiles();

            $answerImageFileName = saveImageIfExists($uploadedFiles, ANSWER_IMAGE);
            $questionImageFileName = saveImageIfExists($uploadedFiles, QUESTION_IMAGE);

            try {
                Card::create(MAX_CARD_SCORE, intval($_POST[CARD_THEME]));
                Question::create($_POST[QUESTION_TEXT], $questionImageFileName);
                Answer::create($_POST[ANSWER_TEXT], $answerImageFileName);

                $response->getBody()->write(TRUE_RESULT);
            } catch (DatabaseException $e) {
                $response->getBody()->write('{"success": false, "reason": "' . $e->getMessage() . '"}');
            }

            return $response;
        });

        $group->post('{card_id}', function (Request $request, Response $response, array $args) {
            $cardId = $args['card_id'];

            return sendResponse($response, TRUE_RESULT);
        });

        $group->delete('{card_id}', function (Request $request, Response $response, array $args) {
            $cardId = $args['card_id'];
            $isDestroyed = Card::destroy($cardId) == 1;

            return sendResponse($response, $isDestroyed ? TRUE_RESULT : FALSE_RESULT);
        });
    });

    $app->group('/theme/', function (RouteCollectorProxy $group) {

        $group->get('list', function (Request $request, Response $response) {
            $themes = Theme::all()->toJson();

            return sendResponse($response, $themes);
        });

        $group->post('create', function (Request $request, Response $response) {
            $uploadedFiles = $request->getUploadedFiles();

            $themeImageFileName = saveImageIfExists($uploadedFiles, THEME_IMAGE);

            try {
                Theme::create($_POST[THEME_NAME], $themeImageFileName);

                $response->getBody()->write(TRUE_RESULT);
            } catch (DatabaseException $e) {
                $response->getBody()->write('{"success": false, "reason": "' . $e->getMessage() . '"}');
            }

            return $response;
        });
    });
};

function sendResponse(Response $response, string $body): Response
{
    $response->getBody()->write($body);
    return $response;
}
