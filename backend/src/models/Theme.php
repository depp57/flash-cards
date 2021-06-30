<?php

namespace flashcards\models;

use Exception;
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
     * @throws Exception
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

    /**
     * @throws Exception
     */
    public static function modify(int $id, string $name = null, string $imagePath = null): Theme
    {
        ensureAnySet($name, $imagePath);

        $theme = Theme::find($id);
        if ($theme == null) throw new DatabaseException('No matching Theme');

        if (isset($name)) $theme->name = $name;
        if (isset($imagePath)) $theme->image = $imagePath;

        if (!$theme->save()) {
            throw new DatabaseException('Unable to modify Theme');
        }

        return $theme;
    }
}
