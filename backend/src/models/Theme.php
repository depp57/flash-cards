<?php

namespace flashcards\models;

use flashcards\exceptions\DatabaseException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Theme extends Model
{
    protected $table = 'theme';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    public function cards(): HasMany
    {
        return $this->hasMany(Card::class, 'theme');
    }

    /**
     * @throws DatabaseException
     */
    public static function create(?string $name, ?string $imagePath): Theme
    {
        ensureAnySet($name, $imagePath);

        $theme = new Theme();

        $theme->name = $name;
        $theme->image = $imagePath;

        if (!$theme->save()) {
            throw new DatabaseException('Unable to save Theme');
        }

        return $theme;
    }
}
