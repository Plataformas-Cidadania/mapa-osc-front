<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PostController2 extends Controller{



    private $obj;
    private $module;
    private $table;
    private $type;

    public function __construct(){
        $this->obj = new \App\Publication();
        $this->module = 'post';
        $this->table = 'posts';
    }

    public function listing(){

        $lists = $this->obj->orderBy('id', 'desc')->paginate(10);
        return view($this->module.'.list', ['lists' => $lists]);
    }

    public function details($id){
        $detail = $this->obj
            ->join('lng_pub_posts', 'pub_posts.id', '=', 'lng_pub_posts.publish_id')
            ->select('pub_posts.*', 'lng_pub_posts.title', 'lng_pub_posts.description')
            ->find($id);

        $lasts = $this->obj
            ->join('lng_pub_posts', 'pub_posts.id', '=', 'lng_pub_posts.publish_id')
            ->select('pub_posts.*', 'lng_pub_posts.title', 'lng_pub_posts.description')
            ->where('pub_posts.id', '!=', $detail->id)
            ->orderBy('id', 'desc')
            ->take(4)
            ->get();

        $commentsQtd = \App\PubComment::where('origin_id', $detail->id)->count();
        $comments = \App\PubComment::where('origin_id', $detail->id)->orderBy('id', 'desc')->get();

        $members = \App\PubMember::
            select(
                DB::Raw("
                    pub_members.id,
                    pub_members.name,
                    count(jnc_posts_members.member_id) as qtd
                ")
            )
            ->join('jnc_posts_members', 'pub_members.id', '=', 'jnc_posts_members.member_id')
            ->where('jnc_posts_members.post_id', $detail->id)
            ->groupBy('pub_members.id', 'pub_members.name')
            ->get();


        return view($this->module.'.detail', [
            'detail' => $detail,
            'lasts' => $lasts,
            'comments' => $comments,
            'commentsQtd' => $commentsQtd,
            'members' => $members
        ]);
    }

}
