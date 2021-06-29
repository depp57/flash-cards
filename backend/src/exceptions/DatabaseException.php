<?php

namespace flashcards\exceptions;

use Throwable;

class DatabaseException extends \Exception
{
    public function __construct($message = 'Database error', $code = 0, Throwable $previous = null) {
        parent::__construct($message, $code, $previous);
        $this->message = 'Database error : ' . $this->message;
    }
}
