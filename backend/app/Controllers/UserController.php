<?php

namespace App\Controllers;

use App\Services\UserService;
use App\View\View;

class UserController {

    public function __construct(
        private UserService $service
    ) {}

    public function index() {
        $users = $this->service->list();
        $persons = $this->service->persons();
        return View::render('users/index', [
            'users' => $users,
            'persons' => $persons
        ]);
    }
    
}