<?php

$router->get("/", "IndexController@index");
$router->get('/users', 'UserController@index');
$router->get('/user', 'UserController@cadastrar');