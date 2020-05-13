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

        $areas_atuacao = DB::connection('map')
            ->table('analysis.vw_perfil_localidade_area_atuacao')
            ->select(DB::Raw("
                   count(quantidade_oscs) as series,
                   area_atuacao as labels
            "))
            ->groupBy('area_atuacao')
            ->get();

        return view('indicator.chart', [
            'areas_atuacao' => $areas_atuacao,
        ]);

    }

    public function getIndicator(){

        $results = DB::connection('map')
            ->table('analysis.vw_perfil_localidade_area_atuacao')
            ->select(DB::Raw("
                   count(quantidade_oscs) as series,
                   area_atuacao as labels
            "))
            ->groupBy('area_atuacao')
            ->get();

        $data = [
            'series' => [],
            'labels' => []
        ];

        foreach ($results as $item) {
            array_push( $data['series'], $item->series);
            array_push( $data['labels'], $item->labels);
        }

        $results = [];
        $results['indicator'] = $data;
        return $results;

    }
}
