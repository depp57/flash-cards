<?php

use flashcards\exceptions\DatabaseException;
use Psr\Http\Message\UploadedFileInterface;

define('UPLOADED_FILES_DIR', pathinfo($_SERVER['SCRIPT_FILENAME'], PATHINFO_DIRNAME) . DIRECTORY_SEPARATOR . 'uploaded_files' . DIRECTORY_SEPARATOR);
define("FILE_TOO_BIG", errorJson('FILE_EXCEED_500_Ko'));

const MAX_CARD_SCORE = 6;

const TRUE_RESULT = '{"success": true}';
const FALSE_RESULT = '{"success": false}';

const ANSWER_TEXT = 'answer_text';
const ANSWER_IMAGE = 'answer_image';
const QUESTION_TEXT = 'question_text';
const QUESTION_IMAGE = 'question_image';
const CARD_SCORE = 'card_score';
const CARD_THEME = 'card_theme';
const THEME_NAME = 'theme_name';
const THEME_IMAGE = 'theme_image';

// https://www.slimframework.com/docs/v4/cookbook/uploading-files.html
function saveFile(UploadedFileInterface $file): string
{
    if ($file->getSize() > 512000) { // 500 Ko
        badRequestError(FILE_TOO_BIG);
    }

    $extension = pathinfo($file->getClientFilename(), PATHINFO_EXTENSION);

    $baseName = bin2hex(random_bytes(8));
    $fileName = sprintf('%s.%0.8s', $baseName, $extension);

    $file->moveTo(UPLOADED_FILES_DIR . $fileName);

    return $fileName;
}

function saveImageIfExists(array $uploadedFiles, string $image_key): ?string
{
    if (isset($uploadedFiles[$image_key])) {
        $image = $uploadedFiles[$image_key];

        if (!preg_match('/^.+\.(jpg|jpeg|png)$/i', $image->getClientFilename())) {
            badRequestError();
        }

        return saveFile($image);
    }

    return null;
}

function ensureAllSet(mixed ...$variables): void
{
    foreach ($variables as $var) {
        if (!isset($var)) {
            badRequestError();
        }
    }
}

/**
 * @throws Exception
 */
function ensureAnySet(mixed ...$variables): void
{
    foreach ($variables as $var) {
        if (isset($var)) {
            return;
        }
    }

    throw new Exception('At least one parameters must be declared');
}

function internalError(string $error = FALSE_RESULT): void
{
    header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
    if (isset($error)) echo $error;
    exit(1);
}

function badRequestError(string $error = FALSE_RESULT): void
{
    header($_SERVER['SERVER_PROTOCOL'] . ' 400 Bad Request', true, 400);
    if (isset($error)) echo $error;
    exit(1);
}

function errorJson(string $cause): string
{
    return '{"success": false, "cause": "' . $cause . '"}';
}
