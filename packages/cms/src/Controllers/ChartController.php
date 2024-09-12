<?php

namespace Cms\Controllers;

use Cms\Models\ImagemCms;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Facades\Image;

class ChartController extends Controller
{



    public function __construct()
    {
        $this->chart = new \App\Chart;
        $this->campos = [
            'imagem', 'titulo', 'descricao', 'tipo', 'fonte', 'slug', 'chart_categoria_id', 'cmsuser_id',
        ];
        $this->pathImagem = public_path().'/imagens/charts';
        $this->sizesImagem = [
            'xs' => ['width' => 80, 'height' => 80],
            'sm' => ['width' => 170, 'height' => 170],
            'md' => ['width' => 300, 'height' => 300],
            'lg' => ['width' => 500, 'height' => 500]
        ];
        $this->widthOriginal = true;
    }

    function index($chart_categoria_id)
    {
        $chartCategoria = \App\ChartCategoria::where('id', $chart_categoria_id)->first();
        $charts = \App\Chart::all();


        return view('cms::chart.listar', ['chart_categoria_id' => $chartCategoria->id, 'charts' => $charts]);
    }

    public function listar(Request $request)
    {

        $campos = explode(", ", $request->campos);

        $charts = DB::table('charts')
            ->select($campos)
            ->where([
                [$request->campoPesquisa, 'like', "%$request->dadoPesquisa%"],
                ['chart_categoria_id', $request->chart_categoria_id],
            ])
            ->orderBy($request->ordem, $request->sentido)
            ->paginate($request->itensPorPagina);
        return $charts;
    }

    public function inserir(Request $request)
    {

        $data = $request->all();

        //return $data;

        $data['chart'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                $data['chart'] += [$campo => ''];
            }
        }

        $file = $request->file('file');

        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $success = $imagemCms->inserir($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal);

            if($success){
                $data['chart']['imagem'] = $filename;
                return $this->chart->create($data['chart']);
            }else{
                return "erro";
            }
        }

        $insert = $this->chart->create($data['chart']);


        return $insert;

    }

    public function detalhar($id)
    {
        $chart = $this->chart->where([
            ['id', '=', $id],
        ])->firstOrFail();




        return view('cms::chart.detalhar', ['chart' => $chart]);
    }

    public function alterar(Request $request, $id)
    {
        $data = $request->all();
        $data['chart'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                if($campo!='imagem'){
                    $data['chart'] += [$campo => ''];
                }
            }
        }
        $chart = $this->chart->where([
            ['id', '=', $id],
        ])->firstOrFail();

        $file = $request->file('file');

        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $success = $imagemCms->alterar($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal, $chart);
            if($success){
                $data['chart']['imagem'] = $filename;
                $chart->update($data['chart']);
                return $chart->imagem;
            }else{
                return "erro";
            }
        }

        //remover imagem
        if($data['removerImagem']){
            $data['chart']['imagem'] = '';
            if(file_exists($this->pathImagem."/".$chart->imagem)) {
                unlink($this->pathImagem . "/" . $chart->imagem);
            }
        }

        $chart->update($data['chart']);


        return "Gravado com sucesso";
    }

    public function excluir($id)
    {
        //Auth::loginUsingId(2);

        $chart = $this->chart->where([
            ['id', '=', $id],
        ])->firstOrFail();

        //remover imagens
        if(!empty($chart->imagem)){
            //remover imagens
            $imagemCms = new ImagemCms();
            $imagemCms->excluir($this->pathImagem, $this->sizesImagem, $chart);
        }


        $chart->delete();

    }




}
