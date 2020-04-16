<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ArticleController extends Controller{

    private $obj;
    private $module;
    private $table;

    public function __construct(){
        $this->obj = new \App\PubArticle();
        $this->module = 'article';
        $this->table = 'articles';
    }

    public function listing(){
        $lists = $this->obj->orderBy('id', 'desc')->paginate(10);
        return view($this->module.'.list', ['lists' => $lists]);
    }

    public function details($id){
        $detail = $this->obj
            ->join('lng_pub_articles', 'pub_articles.id', '=', 'lng_pub_articles.publish_id')
            ->select('pub_articles.*', 'lng_pub_articles.title', 'lng_pub_articles.description')
            ->find($id);

        $lasts = $this->obj
            ->join('lng_pub_articles', 'pub_articles.id', '=', 'lng_pub_articles.publish_id')
            ->select('pub_articles.*', 'lng_pub_articles.title', 'lng_pub_articles.description')
            ->where('pub_articles.id', '!=', $detail->id)
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
                    count(jnc_articles_members.member_id) as qtd
                ")
            )
            ->join('jnc_articles_members', 'pub_members.id', '=', 'jnc_articles_members.member_id')
            ->where('jnc_articles_members.article_id', $detail->id)
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
