<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;


class HomeController extends Controller
{
    public function index(){

        $articles = \App\PubArticle::
            join('lng_pub_articles', 'pub_articles.id', '=', 'lng_pub_articles.publish_id')
            ->select('pub_articles.*', 'lng_pub_articles.title', 'lng_pub_articles.description')
            ->orderBy('id', 'desc')
            ->take(3)
            ->get();


        $osc_recentes = DB::connection('map')
            ->table('portal.vw_log_alteracao')
            ->select('id_osc', 'tx_nome_osc')
            ->orderBy('dt_alteracao', 'desc')
            ->take(9)
            ->get();


        return view('home', ['articles' => $articles, 'osc_recentes' => $osc_recentes]);
    }
}


