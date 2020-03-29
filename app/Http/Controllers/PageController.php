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
    private $lngObj;
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

        $lngPage = $this->lngObj->where('slug', $rota)->first();
        $page = $lngPage->pubPage()->first();

        $subMenus = $this->obj
            ->join('lng_pub_pages', 'pub_pages.id', '=', 'lng_pub_pages.publish_id')
            ->select('pub_pages.*', 'lng_pub_pages.title', 'lng_pub_pages.description', 'lng_pub_pages.slug')
            ->where('lng_pub_pages.publish_id', $lngPage->publish_id)
            ->get();

        return view($this->module.'.basic', [
            'lngPage' => $lngPage,
            'page' => $page,
            'subMenus' => $subMenus
        ]);

    }
}
