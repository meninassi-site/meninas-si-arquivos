<?php

namespace App\View;

class Renderer {

    public static function render(string $view, array $data = []) {
        extract($data);

        ob_start();
        require __DIR__ . "/../../resources/views/$view.php";
        $content = ob_get_clean();

        ob_start();
        require __DIR__ . "/../../resources/views/layouts/main.php";
        return ob_get_clean();
    }
}