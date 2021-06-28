<?php

namespace flashcards\config;

use Exception;
use Illuminate\Database\Capsule\Manager as DB;

class Database
{
    public static function connect()
    {
        try {
            if (!file_exists('src/config/database.ini')) {
                throw new Exception();
            }

            $data = parse_ini_file('src/config/database.ini');

            $db = new DB();
            $db->addConnection([
                'driver' => $data['driver'],
                'host' => $data['host'],
                'database' => $data['database'],
                'username' => $data['username'],
                'password' => $data['password'],
                'charset' => $data['charset'],
                'collation' => $data['collation'],
                'prefix' => ''
            ]);
            $db->setAsGlobal();
            $db->bootEloquent();

            // Test database connection
            DB::connection()->getPdo();
        } catch (Exception) {
            internalError();
        }
    }
}
