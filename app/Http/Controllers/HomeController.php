<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;


class HomeController extends Controller
{
    public function index(){

        $webdoors = \App\Webdoor::orderBy('posicao')->where('status', 1)->get();
        $teasers = \App\Teaser::orderBy('teaser')->get();
        $publicacoes = \App\Publication::orderBy('id', 'desc')->take(3)->get();

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
            'webdoors' => $webdoors,
            'teasers' => $teasers,
            'publicacoes' => $publicacoes,
            'osc_recentes' => $osc_recentes,
            'areas_atuacao' => $area_atuacao,
        ]);
    }

    public function getChartHome(){


        //Distribuição por área de atuação/////////
        $results = DB::connection('map')
            ->table('analysis.vw_perfil_localidade_evolucao_anual')
            ->select(DB::Raw("
                   sum(quantidade_oscs) as series,
                   ano_fundacao as labels
            "))
            ->groupBy('quantidade_oscs', 'ano_fundacao')
            ->where('localidade', 11)
            ->where('ano_fundacao', '>', '2009')
            ->orderBy('ano_fundacao')
            ->get();

        $data = [
            'series' => [
                ['name' => 'Nome Serie', 'type' => 'line', 'data' => []],//type: column, line, area
            ],
            'labels' => []
        ];

        foreach ($results as $item) {
            array_push( $data['series'][0]['data'], $item->series);
            array_push( $data['labels'], $item->labels);
        }
        //////////////////////////////////////////


        $results2 = DB::connection('map')
            ->table('analysis.vw_perfil_localidade_natureza_juridica')
            ->select(DB::Raw("
                   sum(quantidade_oscs) as series,
                   natureza_juridica as title,
                   localidade as labels
            "))
            ->groupBy('quantidade_oscs', 'natureza_juridica', 'localidade')
            ->where('localidade', 11)
            ->get();


            $data2 = [
                'series' => [
                    ['name' => [], 'type' => 'column', 'data' => []],//type: column, line, area
                ],
                'labels' => []
            ];

            foreach ($results2 as $key => $item) {
                array_push( $data2['series'][0]['data'], $item->series);
                array_push( $data2['series'][0]['name'], $item->title);
                array_push( $data2['labels'], $item->labels);
            }
        //////////////////////////////////////////

        $results = [];
        $results['chart'] = $data;
        $results['chart2'] = $data2;
        return $results;

    }
}


