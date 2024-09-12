<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

class IndicatorController extends Controller{


    public function chart(){

        $text = \App\Text::where('slug', 'dados-indicadores')->first();
        /*$areas_atuacao = DB::connection('map')
            ->table('analysis.vw_perfil_localidade_area_atuacao')
            ->select(DB::Raw("
                   count(quantidade_oscs) as series,
                   area_atuacao as labels
            "))
            ->groupBy('area_atuacao')
            ->get();*/

        if(!empty($text)){
            return view('indicator.chart', [
                'text' => $text,
                //'areas_atuacao' => $areas_atuacao,
            ]);
        }

        return "<div style='color: #721c24; background-color: #f8d7da; border-color: #f5c6cb; padding: 10px; border-radius: 5px; text-align: center;'>
                    Ops! Cadastre no CMS em texts o slug
                    <strong>dados-indicadores</strong>
                </div>";

    }

    public function chartNew(){

        $text = \App\Text::where('slug', 'dados-indicadores')->first();
        $ChartCategorias = \App\ChartCategoria::orderBy('posicao')->get();


        /*/////////////////////////////////////*/
        $chartType = 'column';

        $data = DB::table('public.dados_charts')
            ->select('data', 'label', 'valor', 'slug', 'type', 'grupo_id')
            //->where('slug', $chartType)
            ->orderBy('data')
            ->get();

        // Organize the data into an appropriate structure
        $groups = $data->groupBy('grupo_id');

        $organizedData = [];

        foreach ($groups as $grupoId => $dataGroup) {
            Log::info($dataGroup->pluck('type'));
            $labels = $dataGroup->pluck('data')->unique()->sort()->values();
            $series = [];

            foreach ($dataGroup->groupBy('label') as $label => $values) {
                $series[] = [
                    'name' => $label,
                    'type' => $values->first()->type,
                    'data' => $values->pluck('valor')->values()
                ];
            }

            $organizedData[$grupoId] = [
                'labels' => $labels,
                'series' => $series,
            ];
        }

        //return response()->json($organizedData);
        /*/////////////////////////////////////*/


        if(!empty($text)){
            return view('indicator-new.chart', [
                'text' => $text,
                'chart' => response()->json($organizedData),
            ]);
        }

        return "<div style='color: #721c24; background-color: #f8d7da; border-color: #f5c6cb; padding: 10px; border-radius: 5px; text-align: center;'>
                    Ops! Cadastre no CMS em texts o slug
                    <strong>dados-indicadores</strong>
                </div>";

    }

    public function analises(){
        return DB::table("portal.tb_analise")->where('status', 1)->orderBy('id_analise')->get();
    }
    public function analisesHome(){
        return DB::table("portal.tb_analise")
            ->where('status', 1)
            ->where('slug','home')
            ->orderBy('id_analise')->get();
    }

    public function getIndicator(){

        //Distribuição por área de atuação/////////
        $results = DB::connection('map')
            ->table('analysis.vw_perfil_localidade_area_atuacao')
            ->select(DB::Raw("
                   count(quantidade_oscs) as series,
                   area_atuacao as labels
            "))
            ->groupBy('area_atuacao')
            ->get();

        $data = [
            'series' => [
                ['name' => 'Nome Serie', 'type' => 'column', 'data' => []],//type: column, line, area
            ],
            'labels' => []
        ];

        foreach ($results as $item) {
            array_push( $data['series'][0]['data'], $item->series);
            array_push( $data['labels'], $item->labels);
        }
        //////////////////////////////////////////
        //Distribuição de OSCs por área de atuação
        $results2 = DB::connection('map')
            ->table('analysis.vw_perfil_localidade_area_atuacao')
            ->select(DB::Raw("
                   count(quantidade_oscs) as series,
                   area_atuacao as labels
            "))
            ->groupBy('area_atuacao')
            ->get();

        $data2 = [
            'series' => [],
            'labels' => []
        ];

        foreach ($results2 as $item) {
            array_push( $data2['series'], $item->series);
            array_push( $data2['labels'], $item->labels);
        }
        //////////////////////////////////////////

        $results = [];
        $results['chart'] = $data;
        $results['chart2'] = $data2;
        return $results;

    }
}
