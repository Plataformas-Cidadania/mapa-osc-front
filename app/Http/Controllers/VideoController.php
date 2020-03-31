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

        Log::info($this->lngObj);
    }

    public function listing(){
        //Vídeos mais recentes
        $lists = $this->obj
            ->join('lng_pub_videos', 'pub_videos.id', '=', 'lng_pub_videos.publish_id')
            ->select('pub_videos.*', 'lng_pub_videos.title', 'lng_pub_videos.description')
            ->where('lng_pub_videos.publish_id', 'pub_videos.publish_id')
            ->orderBy('pub_videos.id', 'desc')
            ->paginate(16);

        //Vídeos em destaque
        $listsTop = $this->obj
            ->join('lng_pub_videos', 'pub_videos.id', '=', 'lng_pub_videos.publish_id')
            ->select('pub_videos.*', 'lng_pub_videos.title', 'lng_pub_videos.description')
            ->where('lng_pub_videos.publish_id', 'pub_videos.publish_id')
            ->orderBy('pub_videos.id', 'desc')
            ->take(4)
            ->get();

        return view($this->module.'.list', ['lists' => $lists, 'listsTop' => $listsTop]);
    }

    public function details($id){

        $detail = $this->obj
            ->join('lng_pub_videos', 'pub_videos.id', '=', 'lng_pub_videos.publish_id')
            ->select('pub_videos.*', 'lng_pub_videos.title', 'lng_pub_videos.description', 'lng_pub_videos.slug')
            ->where('lng_pub_videos.publish_id', $this->lngObj->publish_id)
            ->orderBy('pub_videos.id', 'desc')
            ->find($id);

        $lists = $this->obj
            ->join('lng_pub_videos', 'pub_videos.id', '=', 'lng_pub_videos.publish_id')
            ->select('pub_videos.*', 'lng_pub_videos.title', 'lng_pub_videos.description', 'lng_pub_videos.slug')
            ->where('lng_pub_videos.publish_id', $this->lngObj->publish_id)
            ->orderBy('pub_videos.id', 'desc')
            ->take(10)
            ->get();

        //$detail = $this->obj->find($id);
        //$lists = $this->obj->orderBy('id', 'desc')->take(10)->get();
        return view($this->module.'.detail', ['detail' => $detail, 'lists' => $lists]);
    }
}
