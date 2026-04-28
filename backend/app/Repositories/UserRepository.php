<?php

namespace App\Repositories;

class UserRepository {

    public function all() {
        return [
            ['name' => 'Leandro'],
            ['name' => 'Maria']
        ];
    }

    public function person() {
        return [
            ['id' => "Lendro"],
            ['id' => "Marizinha"]
        ];
    }
}