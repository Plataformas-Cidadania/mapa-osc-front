<?php

namespace Cms\Controllers;

use Cms\Models\ImagemCms;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Facades\Image;

class ChartCategoriaController extends Controller
{



    public function __construct()
    {
        $this->chartCategoria = new \App\ChartCategoria;
        $this->campos = [
            'imagem', 'titulo', 'descricao', 'arquivo', 'posicao', 'cmsuser_id',
        ];
        $this->pathImagem = public_path().'/imagens/chart-categorias';
        $this->sizesImagem = [
            'xs' => ['width' => 140, 'height' => 79],
            'sm' => ['width' => 480, 'height' => 270],
            'md' => ['width' => 580, 'height' => 326],
            'lg' => ['width' => 1170, 'height' => 658]
        ];
        $this->widthOriginal = true;

        $this->pathArquivo = public_path().'/arquivos/chart-categorias';
    }

    function index()
    {

        $chartCategorias = \App\ChartCategoria::all();
        //$idiomas = \App\Idioma::lists('titulo', 'id')->all();


        return view('cms::chart_categoria.listar', ['chartCategorias' => $chartCategorias]);
        //return view('cms::chartCategoria.listar', ['chartCategorias' => $chartCategorias, 'idiomas' => $idiomas]);
    }

    public function listar(Request $request)
    {

        //Log::info('CAMPOS: '.$request->campos);

        //Auth::loginUsingId(2);

        $campos = explode(", ", $request->campos);

        $chartCategorias = DB::table('chart_categorias')
            ->select($campos)
            ->where([
                [$request->campoPesquisa, 'ilike', "%$request->dadoPesquisa%"],
            ])
            ->orderBy($request->ordem, $request->sentido)
            ->paginate($request->itensPorPagina);
        return $chartCategorias;
    }


    public function inserir(Request $request)
    {

        $data = $request->all();

        $data['chartCategoria'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                $data['chartCategoria'] += [$campo => ''];
            }
        }

        $file = $request->file('file');
        $arquivo = $request->file('arquivo');

	Log::info($request);

        $successFile = true;
        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $successFile = $imagemCms->inserir($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal);
            if($successFile){
                $data['chartCategoria']['imagem'] = $filename;
            }
        }

        $successArquivo = true;
        if($arquivo!=null){
            $filenameArquivo = rand(1000,9999)."-".clean($arquivo->getClientOriginalName());
            $successArquivo = $arquivo->move($this->pathArquivo, $filenameArquivo);
            if($successArquivo){
                $data['chartCategoria']['arquivo'] = $filenameArquivo;
            }
        }


        if($successFile && $successArquivo){
            return $this->chartCategoria->create($data['chartCategoria']);
        }else{
            return "erro";
        }


        return $this->chartCategoria->create($data['chartCategoria']);

    }

    public function detalhar($id)
    {
        $chartCategoria = $this->chartCategoria->where([
            ['id', '=', $id],
        ])->firstOrFail();
        //$idiomas = \App\Idioma::lists('titulo', 'id')->all();

        return view('cms::chart_categoria.detalhar', ['chartCategoria' => $chartCategoria]);
        //return view('cms::chartCategoria.detalhar', ['chartCategoria' => $chartCategoria, 'idiomas' => $idiomas]);
    }

    /*public function alterar(Request $request, $id)
    {
        $data = $request->all();
        $data['chartCategoria'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                if($campo!='imagem'){
                    $data['chartCategoria'] += [$campo => ''];
                }
            }
        }
        $chartCategoria = $this->chartCategoria->where([
            ['id', '=', $id],
        ])->firstOrFail();

        $file = $request->file('file');

        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $success = $imagemCms->alterar($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal, $chartCategoria);
            if($success){
                $data['chartCategoria']['imagem'] = $filename;
                $chartCategoria->update($data['chartCategoria']);
                return $chartCategoria->imagem;
            }else{
                return "erro";
            }
        }

        //remover imagem
        if($data['removerImagem']){
            $data['chartCategoria']['imagem'] = '';
            if(file_exists($this->pathImagem."/".$chartCategoria->imagem)) {
                unchartCategoria($this->pathImagem . "/" . $chartCategoria->imagem);
            }
        }

        $chartCategoria->update($data['chartCategoria']);
        return "Gravado com sucesso";
    }*/

    public function alterar(Request $request, $id)
    {
        $data = $request->all();

        //return $data;

        $data['chartCategoria'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                if($campo!='imagem' && $campo!='arquivo'){
                    $data['chartCategoria'] += [$campo => ''];
                }
            }
        }
        $chartCategoria = $this->chartCategoria->where([
            ['id', '=', $id],
        ])->firstOrFail();


        $file = $request->file('file');
        $arquivo = $request->file('arquivo');

	Log::info($request);

        //remover imagem
        if($data['removerImagem']){
            $data['chartCategoria']['imagem'] = '';
            if(file_exists($this->pathImagem."/".$chartCategoria->imagem)) {
                unchartCategoria($this->pathImagem . "/" . $chartCategoria->imagem);
            }
        }


        if($data['removerArquivo']){
            $data['chartCategoria']['arquivo'] = '';
            if(file_exists($this->pathArquivo."/".$chartCategoria->arquivo)) {
                unchartCategoria($this->pathArquivo . "/" . $chartCategoria->arquivo);
            }
        }


        $successFile = true;
        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $successFile = $imagemCms->alterar($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal, $chartCategoria);
            if($successFile){
                $data['chartCategoria']['imagem'] = $filename;
            }
        }

        $successArquivo = true;
        if($arquivo!=null){
            $filenameArquivo = rand(1000,9999)."-".clean($arquivo->getClientOriginalName());
            $successArquivo = $arquivo->move($this->pathArquivo, $filenameArquivo);
            if($successArquivo){
                $data['chartCategoria']['arquivo'] = $filenameArquivo;
            }
        }

        if($successFile && $successArquivo){

            $chartCategoria->update($data['chartCategoria']);
            return $chartCategoria->imagem;
        }else{
            return "erro";
        }

        //$chartCategoria->update($data['chartCategoria']);
        //return "Gravado com sucesso";
    }

    public function excluir($id)
    {
        //Auth::loginUsingId(2);

        $chartCategoria = $this->chartCategoria->where([
            ['id', '=', $id],
        ])->firstOrFail();

        //remover imagens
        if(!empty($chartCategoria->imagem)){
            //remover imagens
            $imagemCms = new ImagemCms();
            $imagemCms->excluir($this->pathImagem, $this->sizesImagem, $chartCategoria);
        }


        if(!empty($chartCategoria->arquivo)) {
            if (file_exists($this->pathArquivo . "/" . $chartCategoria->arquivo)) {
                unchartCategoria($this->pathArquivo . "/" . $chartCategoria->arquivo);
            }
        }

        $chartCategoria->delete();

    }

    public function status($id)
    {
        $tipo_atual = DB::table('chart_categorias')->where('id', $id)->first();
        $status = $tipo_atual->status == 0 ? 1 : 0;
        DB::table('chart_categorias')->where('id', $id)->update(['status' => $status]);

    }

    public function positionUp($id)
    {

        $posicao_atual = DB::table('chart_categorias')->where('id', $id)->first();
        $upPosicao = $posicao_atual->posicao-1;
        $posicao = $posicao_atual->posicao;

        //Coloca com a posicao do anterior
        DB::table('chart_categorias')->where('posicao', $upPosicao)->update(['posicao' => $posicao]);

        //atualiza a posicao para o anterior
        DB::table('chart_categorias')->where('id', $id)->update(['posicao' => $upPosicao]);


    }

    public function positionDown($id)
    {

        $posicao_atual = DB::table('chart_categorias')->where('id', $id)->first();
        $upPosicao = $posicao_atual->posicao+1;
        $posicao = $posicao_atual->posicao;

        //Coloca com a posicao do anterior
        DB::table('chart_categorias')->where('posicao', $upPosicao)->update(['posicao' => $posicao]);

        //atualiza a posicao para o anterior
        DB::table('chart_categorias')->where('id', $id)->update(['posicao' => $upPosicao]);

    }


}
