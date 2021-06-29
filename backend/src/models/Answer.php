<?php

namespace flashcards\models;

use Exception;
use flashcards\exceptions\DatabaseException;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $table = 'answer';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * @throws Exception
     */
    public static function create(?string $text, ?string $imagePath): Answer
    {
        ensureAnySet($text, $imagePath);

        $answer = new Answer();

        $answer->text = $text;
        $answer->image = $imagePath;

        if (!$answer->save()) {
            throw new DatabaseException('Unable to save Answer');
        }

        return $answer;
    }
}
