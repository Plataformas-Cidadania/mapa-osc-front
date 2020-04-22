<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class VideoController extends Controller{

    private $obj;
    private $lngObj;
    private $module;
    private $table;

    public function __construct(){
        $this->obj = new \App\PubVideo();
        $this->lngObj = new \App\LngPubVideo();
        $this->module = 'video';
        $this->table = 'videos';
    }

    public function listing(){
        //Vídeos em destaque
        $listsTop = $this->obj
            ->join('lng_pub_videos', 'pub_videos.id', '=', 'lng_pub_videos.publish_id')
            ->select('pub_videos.*', 'lng_pub_videos.title', 'lng_pub_videos.description')
            ->orderBy('pub_videos.views', 'desc')
            ->take(4)
            ->get();

        //Vídeos mais recentes
        $lists = $this->obj
            ->join('lng_pub_videos', 'pub_videos.id', '=', 'lng_pub_videos.publish_id')
            ->select('pub_videos.*', 'lng_pub_videos.title', 'lng_pub_videos.description')
            ->orderBy('pub_videos.id', 'desc')
            ->skip(4)
            ->paginate(16);

        //return $lists;

        return view($this->module.'.list', ['lists' => $lists, 'listsTop' => $listsTop]);
    }



    public function details($id){

        $detail = $this->obj
            ->join('lng_pub_videos', 'pub_videos.id', '=', 'lng_pub_videos.publish_id')
            ->select('pub_videos.*', 'lng_pub_videos.title', 'lng_pub_videos.description')
            ->where('pub_videos.id', $id)
            ->first();

        $lists = $this->obj
            ->join('lng_pub_videos', 'pub_videos.id', '=', 'lng_pub_videos.publish_id')
            ->select('pub_videos.*', 'lng_pub_videos.title', 'lng_pub_videos.description')
            ->orderBy('pub_videos.id', 'desc')
            ->take(10)
            ->get();

        $addViews = $detail->views+1;

        $views = $this->obj
            ->where('pub_videos.id', $id)
            ->update(['views' => $addViews]);

        return view($this->module.'.detail', ['detail' => $detail, 'lists' => $lists]);
    }
}
