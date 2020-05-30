<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

class MapController extends Controller{

    private $obj;
    private $module;
    private $table;


    public function __construct(){
        $this->obj = new \App\Map();
        $this->module = 'map';
        $this->table = 'maps';

    }

    public function details(){
        return view($this->module.'.detail');
    }
}
