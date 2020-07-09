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
        //Vídeos em destaque
        $listsTop = $this->obj->orderBy('views', 'desc')->take(4)->get();

        //Vídeos mais recentes
        $lists = $this->obj->orderBy('id', 'desc')->skip(4)->paginate(16);

        //return $lists;

        return view($this->module.'.list', ['lists' => $lists, 'listsTop' => $listsTop]);
    }



    public function details($id){

        $detail = $this->obj->where('id', $id)->first();

        $lists = $this->obj->orderBy('id', 'desc')->take(10)->get();

        $prev = $this->obj->select('id', 'titulo')->where('id','<', $id)->orderBy('id', 'desc')->first();
        $next = $this->obj->select('id', 'titulo')->where('id','>', $id)->orderBy('id')->first();

        $addViews = $detail->views+1;

        $views = $this->obj->where('id', $id)->update(['views' => $addViews]);

        return view($this->module.'.detail', [
            'detail' => $detail,
            'lists' => $lists,
            'prev' => $prev,
            'next' => $next
        ]);
    }
}
