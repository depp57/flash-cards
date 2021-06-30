<?php

namespace flashcards\models;

use Exception;
use flashcards\exceptions\DatabaseException;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $table = 'answer';
    protected $hidden = ['id'];

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

    /**
     * @throws Exception
     */
    public static function modify(int $id, string $text = null, string $imagePath = null): Answer
    {
        ensureAnySet($text, $imagePath);

        $answer = Answer::find($id);
        if ($answer == null) throw new DatabaseException('No matching Answer');

        if (isset($text)) $answer->text = $text;
        if (isset($imagePath)) $answer->image = $imagePath;

        if (!$answer->save()) {
            throw new DatabaseException('Unable to modify Answer');
        }

        return $answer;
    }
}
