<?php

namespace flashcards\models;

use Illuminate\Database\Eloquent\Model;

class Progression extends Model
{
    protected $table = 'progression';

    protected $primaryKey = 'date';
    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The storage format of the model's date columns.
     *
     * @var string
     */
    protected $dateFormat = 'DD/MM/YY';
}
