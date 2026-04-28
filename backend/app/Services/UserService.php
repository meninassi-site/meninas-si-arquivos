<?php

namespace App\Services;

use App\Repositories\UserRepository;

class UserService {

    public function __construct(
        private UserRepository $repository
    ) {}

    public function list() {
        return $this->repository->all();
    }

    public function persons() {
        return $this->repository->person();
    }
}