<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OscController extends Controller{

    private $obj;
    private $module;
    private $table;

    public function __construct(){
        $this->obj = new \App\Osc();
        $this->module = 'osc';
        $this->table = 'oscs';
    }

    public function edit(){

        return view($this->module.'.edit');

    }

    public function details($id){
        $detail = $this->obj->find($id);
        $lasts = $this->obj->orderBy('id', 'desc')->take(4)->get();
        return view($this->module.'.detail', ['detail' => $detail, 'lasts' => $lasts]);
    }
}
