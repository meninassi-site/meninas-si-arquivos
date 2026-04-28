<?php

namespace App\View;

class View {

    public static function render(string $view, array $data = []) {
        return Renderer::render($view, $data);
    }
}