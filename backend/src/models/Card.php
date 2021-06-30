<?php

namespace flashcards\models;

use Exception;
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
        return $this->hasOne(Question::class, 'id');
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
        $card->theme_id = $themeId;

        if (!$card->save()) {
            throw new DatabaseException('Unable to save Card');
        }

        return $card;
    }

    /**
     * @throws Exception
     */
    public static function modify(int $id, int $score = null, int $themeId = null): Card
    {
        ensureAnySet($score, $themeId);

        $card = Card::find($id);
        if ($card == null) throw new DatabaseException('No matching Card');

        if (isset($score)) $card->score = $score;
        if (isset($themeId)) $card->theme_id = $themeId;

        if (!$card->save()) throw new DatabaseException('Unable to modify Card');

        return $card;
    }
}
