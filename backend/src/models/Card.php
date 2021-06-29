<?php

namespace flashcards\models;

use flashcards\exceptions\DatabaseException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Card extends Model
{
    protected $table = 'card';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    public function question(): HasOne
    {
        return $this->hasOne(Question::class);
    }

    public function theme(): BelongsTo
    {
        return $this->belongsTo(Theme::class);
    }

    /**
     * @throws DatabaseException
     */
    public static function create(int $score, int $themeId): Card
    {
        if ($themeId == 0) {
            badRequestError();
        }

        $card = new Card();

        $card->score = $score;
        $card->theme = $themeId;

        if (!$card->save()) {
            throw new DatabaseException('Unable to save Card');
        }

        return $card;
    }

    /**
     * @throws DatabaseException
     */
    public static function modify(int $id, array $changes): Card
    {
        $answerText = $changes[ANSWER_TEXT];
        $answerImage = $changes[ANSWER_IMAGE];

        $questionText = $changes[QUESTION_TEXT];
        $questionImage = $changes[QUESTION_IMAGE];

        $cardScore = $changes[CARD_SCORE];
        $cardTheme = $changes[CARD_THEME];

        if (isset($changes[ANSWER_TEXT]) || isset($changes[ANSWER_IMAGE])) {
            $card = Card::find($id);
            $question = $card->question;
            $answer = $question->answer;

        } elseif (isset($changes[QUESTION_TEXT]) || isset($changes[QUESTION_IMAGE])) {

        } elseif (isset($changes[CARD_SCORE]) || isset($changes[CARD_THEME])) {

        }

    }
}
