<?php

namespace Cms\Controllers;

use Cms\Models\ImagemCms;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Facades\Image;

class PrintingController extends Controller
{



    public function __construct()
    {
        $this->printing = new \App\Printing;
        $this->campos = [
            'imagem', 'type', 'title', 'description', 'arquivo', 'cmsuser_id',
        ];
        $this->pathImagem = public_path().'/imagens/printings';
        $this->sizesImagem = [
            'xs' => ['width' => 80, 'height' => 80],
            'sm' => ['width' => 270, 'height' => 270],
            'md' => ['width' => 400, 'height' => 400],
            'lg' => ['width' => 500, 'height' => 500]
        ];
        $this->widthOriginal = true;

        $this->pathArquivo = public_path().'/arquivos/printings';
    }

    function index()
    {

        $printings = \App\Printing::all();
        //$series = \App\Serie::lists('titulo', 'id')->all();


        return view('cms::printing.listar', ['printings' => $printings]);
    }

    public function listar(Request $request)
    {

        //Log::info('CAMPOS: '.$request->campos);

        //Auth::loginUsingId(2);

        $campos = explode(", ", $request->campos);

        $printings = DB::table('printings')
            ->select($campos)
            ->where([
                [$request->campoPesquisa, 'like', "%$request->dadoPesquisa%"],
            ])
            ->orderBy($request->ordem, $request->sentido)
            ->paginate($request->itensPorPagina);
        return $printings;
    }

    /*public function inserir(Request $request)
    {

        $data = $request->all();

        $data['printing'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                $data['printing'] += [$campo => ''];
            }
        }

        $file = $request->file('file');

        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $success = $imagemCms->inserir($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal);

            if($success){
                $data['printing']['imagem'] = $filename;
                return $this->printing->create($data['printing']);
            }else{
                return "erro";
            }
        }

        return $this->printing->create($data['printing']);

    }*/

    public function inserir(Request $request)
    {

        $data = $request->all();

        $data['printing'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                $data['printing'] += [$campo => ''];
            }
        }

        $file = $request->file('file');
        $arquivo = $request->file('arquivo');


        $successFile = true;
        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $successFile = $imagemCms->inserir($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal);
            if($successFile){
                $data['printing']['imagem'] = $filename;
            }
        }

        $successArquivo = true;
        if($arquivo!=null){
            $filenameArquivo = rand(1000,9999)."-".clean($arquivo->getClientOriginalName());
            $successArquivo = $arquivo->move($this->pathArquivo, $filenameArquivo);
            if($successArquivo){
                $data['printing']['arquivo'] = $filenameArquivo;
            }
        }


        if($successFile && $successArquivo){
            return $this->printing->create($data['printing']);
        }else{
            return "erro";
        }


        return $this->printing->create($data['printing']);

    }

    public function detalhar($id)
    {
        $printing = $this->printing->where([
            ['id', '=', $id],
        ])->firstOrFail();



        return view('cms::printing.detalhar', ['printing' => $printing]);
    }

    /*public function alterar(Request $request, $id)
    {
        $data = $request->all();
        $data['printing'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                if($campo!='imagem'){
                    $data['printing'] += [$campo => ''];
                }
            }
        }
        $printing = $this->printing->where([
            ['id', '=', $id],
        ])->firstOrFail();

        $file = $request->file('file');

        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $success = $imagemCms->alterar($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal, $printing);
            if($success){
                $data['printing']['imagem'] = $filename;
                $printing->update($data['printing']);
                return $printing->imagem;
            }else{
                return "erro";
            }
        }

        //remover imagem
        if($data['removerImagem']){
            $data['printing']['imagem'] = '';
            if(file_exists($this->pathImagem."/".$printing->imagem)) {
                unlink($this->pathImagem . "/" . $printing->imagem);
            }
        }

        $printing->update($data['printing']);
        return "Gravado com sucesso";
    }*/

    public function alterar(Request $request, $id)
    {
        $data = $request->all();

        //return $data;

        $data['printing'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                if($campo!='imagem' && $campo!='arquivo'){
                    $data['printing'] += [$campo => ''];
                }
            }
        }
        $printing = $this->printing->where([
            ['id', '=', $id],
        ])->firstOrFail();


        $file = $request->file('file');
        $arquivo = $request->file('arquivo');

        //remover imagem
        if($data['removerImagem']){
            $data['printing']['imagem'] = '';
            if(file_exists($this->pathImagem."/".$printing->imagem)) {
                unlink($this->pathImagem . "/" . $printing->imagem);
            }
        }


        if($data['removerArquivo']){
            $data['printing']['arquivo'] = '';
            if(file_exists($this->pathArquivo."/".$printing->arquivo)) {
                unlink($this->pathArquivo . "/" . $printing->arquivo);
            }
        }


        $successFile = true;
        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $successFile = $imagemCms->alterar($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal, $printing);
            if($successFile){
                $data['printing']['imagem'] = $filename;
            }
        }

        $successArquivo = true;
        if($arquivo!=null){
            $filenameArquivo = rand(1000,9999)."-".clean($arquivo->getClientOriginalName());
            $successArquivo = $arquivo->move($this->pathArquivo, $filenameArquivo);
            if($successArquivo){
                $data['printing']['arquivo'] = $filenameArquivo;
            }
        }

        if($successFile && $successArquivo){

            $printing->update($data['printing']);
            return $printing->imagem;
        }else{
            return "erro";
        }

        //$printing->update($data['printing']);
        //return "Gravado com sucesso";
    }

    public function excluir($id)
    {
        //Auth::loginUsingId(2);

        $printing = $this->printing->where([
            ['id', '=', $id],
        ])->firstOrFail();

        //remover imagens
        if(!empty($printing->imagem)){
            //remover imagens
            $imagemCms = new ImagemCms();
            $imagemCms->excluir($this->pathImagem, $this->sizesImagem, $printing);
        }


        if(!empty($printing->arquivo)) {
            if (file_exists($this->pathArquivo . "/" . $printing->arquivo)) {
                unlink($this->pathArquivo . "/" . $printing->arquivo);
            }
        }

        $printing->delete();

    }




}
