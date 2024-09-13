<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

class ChartController extends Controller{


    public function chartNewAPI(){
        $chartType = 'column';

        $ChartCategorias = \App\ChartCategoria::with(['charts' => function ($query) use ($chartType) {
            // Não filtra os charts por slug aqui para trazer todos os charts
            $query->orderBy('titulo');
        }])->orderBy('posicao')->get();

// Pegando os slugs relacionados aos charts
        $slugs = $ChartCategorias->pluck('charts.*.slug')->flatten()->unique();

// Buscando os dados de `dados_charts` interligados pelo slug
        $data = DB::table('public.dados_charts')
            ->select('data', 'label', 'valor', 'slug', 'type', 'grupo_id')
            ->whereIn('slug', $slugs)
            ->orderBy('data')
            ->get();

        // Organizando os dados de dados_charts agrupados por grupo_id
        $groups = $data->groupBy('grupo_id');

        // Adicionando os dados organizados a cada chart em $ChartCategorias
        foreach ($ChartCategorias as $categoria) {
            foreach ($categoria->charts as $chart) {
                $dataForChart = $data->where('slug', $chart->slug);  // Dados específicos do chart pelo slug

                $groupedData = $dataForChart->groupBy('slug');
                $chartData = [];

                foreach ($groupedData as $grupoId => $dataGroup) {
                    $labels = $dataGroup->pluck('data')->unique()->sort()->values();
                    $series = [];

                    foreach ($dataGroup->groupBy('label') as $label => $values) {
                        $series[] = [
                            'name' => $label,
                            'type' => $values->first()->type,
                            'data' => $values->pluck('valor')->values()
                        ];
                    }

                    $chartData[$grupoId] = [
                        'labels' => $labels,
                        'series' => $series,
                    ];
                }

                // Adicionando o data organizado no chart
                $chart->chartData = $chartData;
            }
        }

// Retorno da estrutura organizada
        return response()->json($ChartCategorias);

    }
    public function chartNewAPI2(){

        $ChartCategorias = \App\ChartCategoria::with(['charts' => function ($query) {
            $query->orderBy('titulo');
        }])->orderBy('posicao')->get();


        return response()->json($ChartCategorias);




        /*/////////////////////////////////////*/
        $chartType = 'column';

        $data = DB::table('public.dados_charts')
            ->select('data', 'label', 'valor', 'slug', 'type', 'grupo_id')
            //->where('slug', $chartType)
            ->orderBy('data')
            ->get();

        // Organize the data into an appropriate structure
        $groups = $data->groupBy('grupo_id');

        $chartData = [];

        foreach ($groups as $grupoId => $dataGroup) {
            $labels = $dataGroup->pluck('data')->unique()->sort()->values();
            $series = [];

            foreach ($dataGroup->groupBy('label') as $label => $values) {
                $series[] = [
                    'name' => $label,
                    'type' => $values->first()->type,
                    'data' => $values->pluck('valor')->values()
                ];
            }

            $chartData[$grupoId] = [
                'labels' => $labels,
                'series' => $series,
            ];
        }

        //return response()->json($chartData);
        /*/////////////////////////////////////*/
        return response()->json($chartData);


    }

}
