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

        // Carregando categorias e charts
        $ChartCategorias = \App\ChartCategoria::with(['charts' => function ($query) use ($chartType) {
            $query->orderBy('titulo');
        }])->orderBy('posicao')->get();

        // Pegando os slugs dos charts
        $slugs = $ChartCategorias->pluck('charts.*.slug')->flatten()->unique();

        // Buscando os dados da tabela `dados_charts`
        $data = DB::table('public.dados_charts')
            ->select('serie', 'label', 'valor', 'slug', 'type')
            ->whereIn('slug', $slugs)
            ->orderBy('serie')
            ->get();

        // Processando cada categoria
        foreach ($ChartCategorias as $categoria) {
            foreach ($categoria->charts as $chart) {
                $dataForChart = $data->where('slug', $chart->slug);  // Dados específicos do chart

                $groupedData = $dataForChart->groupBy('slug');
                $chartData = [];

                foreach ($groupedData as $grupoId => $dataGroup) {
                    $labels = $dataGroup->pluck('label')->unique()->sort()->values();

                    // Array de múltiplas séries
                    $series = [];

                    foreach ($dataGroup->groupBy('serie') as $serie => $values) {
                        $series[] = [
                            'name' => $serie,  // Nome da série
                            'type' => $values->first()->type,  // Tipo de gráfico (ex: 'bar', 'line')
                            'data' => $values->pluck('valor')->map(function($valor) {
                                return (int) $valor; // Convertendo para inteiro
                            })->all(),
                        ];
                    }

                    $chartData[$grupoId] = [
                        'labels' => $labels,  // Labels para o eixo X
                        'series' => $series,  // Múltiplas séries
                    ];
                }

                // Adicionando os dados organizados ao chart
                $chart->chartData = $chartData;
                Log::info($chartData);  // Log para debugging
            }
        }

        // Retornando os dados no formato JSON
        return response()->json($ChartCategorias);
    }



    public function chartNewAPI2(){
        $chartType = 'column';

        $ChartCategorias = \App\ChartCategoria::with(['charts' => function ($query) use ($chartType) {
            // Não filtra os charts por slug aqui para trazer todos os charts
            $query->orderBy('titulo');
        }])->orderBy('posicao')->get();

        // Pegando os slugs relacionados aos charts
        $slugs = $ChartCategorias->pluck('charts.*.slug')->flatten()->unique();

        // Buscando os dados de `dados_charts` interligados pelo slug
        $data = DB::table('public.dados_charts')
            ->select('serie', 'label', 'valor', 'slug', 'type')
            ->whereIn('slug', $slugs)
            ->orderBy('serie')
            ->get();

        // Adicionando os dados organizados a cada chart em $ChartCategorias
        foreach ($ChartCategorias as $categoria) {
            foreach ($categoria->charts as $chart) {

                $dataForChart = $data->where('slug', $chart->slug);  // Dados específicos do chart pelo slug
                $groupedData = $dataForChart->groupBy('slug');
                $chartData = [];

                foreach ($groupedData as $grupoId => $dataGroup) {

                    $labels = $dataGroup->pluck('label')->unique()->sort()->values();
                    $series = [
                        [
                            'name' => '',
                            'type' => '',
                            'data' => []
                        ]
                    ];

                    foreach ($dataGroup->groupBy('label') as $label => $values) {

                        // Adiciona todos os valores de 'valor' ao campo 'data' da série
                        $series[0]['name'] =  '';
                        $series[0]['type'] = $values->first()->type;
                        $series[0]['data'] = array_merge($series[0]['data'], $values->pluck('valor')->map(function($valor) {
                            return (int) $valor; // Convertendo para integer se necessário
                        })->all());
                    }

                    $chartData[$grupoId] = [
                        'labels' => $labels,
                        'series' => $series,
                    ];
                }

                // Adicionando o data organizado no chart
                $chart->chartData = $chartData;
                //Log::info($chartData);
            }
        }


        // Retorno da estrutura organizada
        return response()->json($ChartCategorias);
    }




}
