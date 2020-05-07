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

        $area_atuacao = [
            1 => "Habitação",
            2 => "Saúde",
            3 => "Cultura e recreação",
            4 => "Educação e pesquisa",
            5 => "Assistência social",
            6 => "Religião",
            7 => "Associações patronais",
            8 => "Meio ambiente",
            9 => "Desenvolvimento",
            10 => "Outros",
            11 => "Outras atividades",
        ];

        //return $area_atuacao;


        return view('home', [
            'articles' => $articles,
            'osc_recentes' => $osc_recentes,
            'areas_atuacao' => $area_atuacao,
        ]);
    }
}


