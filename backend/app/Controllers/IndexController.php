<?php
namespace App\Controllers;

use App\View\View;

class IndexController{


    public function index(){
        return View::render("pag_inicial/index");
    }
}