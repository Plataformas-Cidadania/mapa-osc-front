<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;


class HomeController extends Controller
{
    public function index(){

        $webdoors = \App\Webdoor::orderBy('posicao')->where('status', 1)->get();
        $teasers = \App\Teaser::orderBy('posicao')->get();
        $text = \App\Text::where('slug', 'osc-proximas')->first();

        $midiasMenu = DB::table('midias')->orderBy('titulo')->get();
        $midias = \App\Post::orderBy('id', 'desc')->where('destaque', 1)->take(3)->get();
        $popup = \App\Popup::where('status', 1)->orderBy('id', 'desc')->first();

        if(!empty($text)){
            return view('home', [
                'webdoors' => $webdoors,
                'teasers' => $teasers,
                'text' => $text,
                'midias' => $midias,
                'midiasMenu' => $midiasMenu,
                'popup' => $popup,
            ]);
        }

        return "<div style='color: #721c24; background-color: #f8d7da; border-color: #f5c6cb; padding: 10px; border-radius: 5px; text-align: center;'>
                    Ops! Cadastre no CMS em texts o slug
                    <strong>osc-proximas</strong>
                </div>";
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


