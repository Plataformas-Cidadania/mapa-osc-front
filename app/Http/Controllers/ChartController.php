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
            $query->where('status', 1)
                ->orderBy('titulo');
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
                    // Pegar todas as labels únicas em ordem
                    $labels = $dataGroup->pluck('label')->unique()->sort()->values();

                    // Array de múltiplas séries
                    $series = [];

                    // Agrupar por série
                    foreach ($dataGroup->groupBy('serie') as $serie => $values) {
                        // Criar um mapa de labels para valores
                        $labelValues = $values->pluck('valor', 'label');

                        // Criar a série, garantindo que todas as labels tenham um valor
                        $series[] = [
                            'name' => $serie,  // Nome da série
                            'type' => $values->first()->type,  // Tipo de gráfico (ex: 'bar', 'line')
                            'data' => $labels->map(function($label) use ($labelValues) {
                                // Retorna o valor correspondente à label ou 0 se não existir
                                return isset($labelValues[$label]) ? (int) $labelValues[$label] : 0;
                            })->all(),
                        ];
                    }

                    //Log::info($series);

                    $chartData[$grupoId] = [
                        'labels' => $labels,  // Labels para o eixo X
                        'series' => $series,  // Múltiplas séries
                    ];
                }

                // Adicionando os dados organizados ao chart
                $chart->chartData = $chartData;
                //Log::info($chartData);  // Log para debugging
            }
        }

        // Retornando os dados no formato JSON
        return response()->json($ChartCategorias);
    }

}
