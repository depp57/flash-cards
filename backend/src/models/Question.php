<?php

namespace flashcards\models;

use Exception;
use flashcards\exceptions\DatabaseException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Question extends Model
{
    protected $table = 'question';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    public function answer(): HasOne
    {
        return $this->hasOne(Answer::class);
    }

    /**
     * @throws Exception
     */
    public static function create(?string $text, ?string $imagePath): Question
    {
        ensureAnySet($text, $imagePath);

        $question = new Question();

        $question->text = $text;
        $question->image = $imagePath;

        if (!$question->save()) {
            throw new DatabaseException('Unable to save Question');
        }

        return $question;
    }

    /**
     * @throws Exception
     */
    public static function modify(int $id, string $text = null, string $imagePath = null): Question
    {
        ensureAnySet($text, $imagePath);

        $question = Question::find($id);
        if ($question == null) throw new DatabaseException('No matching Question');

        if (isset($text)) $question->text = $text;
        if (isset($imagePath)) $question->image = $imagePath;

        if (!$question->save()) {
            throw new DatabaseException('Unable to modify Question');
        }

        return $question;
    }
}
