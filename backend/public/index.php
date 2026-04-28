<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Core\Container\Container;
use Core\Routing\Router;

$container = new Container();
$router = new Router($container);

require_once __DIR__ . '/../routes/web.php';

$router->dispatch();