<?php

use flashcards\exceptions\FileUploadException;
use Psr\Http\Message\UploadedFileInterface;

define('UPLOADED_FILES_DIR', pathinfo($_SERVER['SCRIPT_FILENAME'], PATHINFO_DIRNAME) . DIRECTORY_SEPARATOR . 'uploaded_files' . DIRECTORY_SEPARATOR);
define("FILE_TOO_BIG", errorJson('FILE_EXCEED_500_Ko'));

const MAX_CARD_SCORE = 6;
const IMAGE_WIDTH = 180;
const IMAGE_HEIGHT = IMAGE_WIDTH;

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
const UPLOADED_IMAGE = 'image';

// https://www.slimframework.com/docs/v4/cookbook/uploading-files.html
/**
 * @throws FileUploadException
 */
function saveFile(UploadedFileInterface $file): string
{
    if ($file->getSize() > 512000) { // 500 Ko
        throw new FileUploadException('image too big (should be < 500ko)');
    }

    try {
        $extension = pathinfo($file->getClientFilename(), PATHINFO_EXTENSION);

        $baseName = bin2hex(random_bytes(8));
        $fileName = sprintf('%s.%0.8s', $baseName, $extension);

        $file->moveTo(UPLOADED_FILES_DIR . $fileName);

        if (preg_match('/(png|jpg|jpeg)/m', $extension)) {
            resizeImage(UPLOADED_FILES_DIR . $fileName, $extension);
        }

        return $fileName;
    } catch (Exception) {
        throw new FileUploadException('unknown error while saving the image');
    }
}

/**
 * @throws FileUploadException
 */
function resizeImage(string $imagePath, string $extension): void
{
    echo 'resize image';

    $image = match ($extension) {
        'png' => imagecreatefrompng($imagePath),
        'jpg', 'jpeg' => imagecreatefromjpeg($imagePath),
        default => throw new FileUploadException('the image should be a jpg/jpeg/png file'),
    };

    $imageResized = imagescale($image, IMAGE_WIDTH, IMAGE_HEIGHT);

    imagealphablending($imageResized, false);
    imagesavealpha($imageResized, true);

    // compression level from 0 to 9, 9 is the highest compression (smallest files)
    imagepng($imageResized, $imagePath, 9);

    echo 'resize image successfully';
}

/**
 * @throws FileUploadException
 */
function saveImageIfExists(array $uploadedFiles): ?string
{
    if (isset($uploadedFiles[UPLOADED_IMAGE])) {
        $image = $uploadedFiles[UPLOADED_IMAGE];

        if (!preg_match('/^.+\.(jpg|jpeg|png)$/i', $image->getClientFilename())) {
            throw new FileUploadException('the image should be a jpg/jpeg/png file');
        }

        return saveFile($image);
    }

    throw new FileUploadException("key 'image' in multiform/formdata required");
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
