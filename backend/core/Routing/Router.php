<?php

namespace Core\Routing;

class Router {
    private array $routes = [];
    private $container;

    public function __construct($container) {
        $this->container = $container;
    }

    public function get($uri, $action) {
        $this->routes['GET'][$uri] = $action;
    }

    public function post($uri, $action) {
        $this->routes['POST'][$uri] = $action;
    }

    public function dispatch() {
        $method = $_SERVER['REQUEST_METHOD'];
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        $action = $this->routes[$method][$uri] ?? null;

        if (!$action) {
            http_response_code(404);
            echo "404 Not Found";
            return;
        }

        [$controller, $method] = explode('@', $action);

        $controller = "App\\Controllers\\$controller";

        $instance = $this->container->make($controller);

        echo call_user_func([$instance, $method]);
    }
}