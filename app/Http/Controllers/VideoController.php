<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class VideoController extends Controller{

    private $obj;
    private $module;
    private $table;

    public function __construct(){
        $this->obj = new \App\Video();
        $this->module = 'video';
        $this->table = 'videos';
    }

    public function listing(){
        $lists = $this->obj->orderBy('id', 'desc')->paginate(16);
        $listsTop = $this->obj->orderBy('id', 'desc')->take(4)->get();
        return view($this->module.'.list', ['lists' => $lists, 'listsTop' => $listsTop]);
    }

    public function details($id){
        $detail = $this->obj->find($id);
        $lists = $this->obj->orderBy('id', 'desc')->take(10)->get();
        return view($this->module.'.detail', ['detail' => $detail, 'lists' => $lists]);
    }
}
