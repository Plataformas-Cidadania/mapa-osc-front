<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

class PageController extends Controller{

    private $obj;
    private $module;
    private $table;

    public function __construct(){
        $this->obj = new \App\PubPage();
        $this->lngObj = new \App\LngPubPage();
        $this->module = 'page';
        $this->table = 'pages';
    }

    public function details(){

        $rota = Route::getCurrentRoute()->uri();

        //$detail = $this->lngObj->where('slug', $rota)->first()->pubPage()->first();
        $lngPage = $this->lngObj->where('slug', $rota)->first();
        $page = $lngPage->pubPage()->first();

        //return [$lngPage, $page];

        //$subMenus = $this->obj->orderBy('id', 'desc')->where('type', $detail->type)->get();

        //$subMenus = $this->lngObj->where('type', $page->type)->orderBy('id', 'desc')->get();
        $subMenus = [];

        return view($this->module.'.basic', ['lngPage' => $lngPage, 'page' => $page, 'subMenus' => $subMenus]);

    }
}
