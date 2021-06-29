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

    $app->group('/cards/', function (RouteCollectorProxy $group) {

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
                Answer::create($_POST[ANSWER_TEXT], $answerImageFileName);
                Question::create($_POST[QUESTION_TEXT], $questionImageFileName);
                Card::create(MAX_CARD_SCORE, intval($_POST[CARD_THEME]));

                $response->getBody()->write(TRUE_RESULT);
            } catch (DatabaseException $e) {
                $response->getBody()->write('{"success": false, "reason": "' . $e->getMessage() . '"}');
            }

            return $response;
        });

        $group->post('modify/{card_id}', function (Request $request, Response $response, array $args) {
            $cardId = $args['card_id'];

        });

        $group->delete('delete/{card_id}', function (Request $request, Response $response, array $args) {
            $cardId = $args['card_id'];

            $isDestroyed = Card::destroy($cardId) == 1;

            return sendResponse($response, $isDestroyed ? TRUE_RESULT : FALSE_RESULT);
        });
    });
};

function sendResponse(Response $response, string $body): Response {
    $response->getBody()->write($body);
    return $response;
}
