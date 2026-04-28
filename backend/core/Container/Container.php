<?php

namespace Core\Container;

use ReflectionClass;

class Container {

    public function make($class) {
        $reflection = new ReflectionClass($class);

        $constructor = $reflection->getConstructor();

        if (!$constructor) {
            return new $class;
        }

        $dependencies = [];

        foreach ($constructor->getParameters() as $param) {
            $dependencies[] = $this->make($param->getType()->getName());
        }

        return $reflection->newInstanceArgs($dependencies);
    }
}