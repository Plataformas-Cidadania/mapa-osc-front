<?php

namespace Cms\Controllers;

use Cms\Models\ImagemCms;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Facades\Image;

class MidiaController extends Controller
{



    public function __construct()
    {
        $this->midia = new \App\Midia;
        $this->campos = [
            'imagem', 'titulo', 'arquivo', 'cmsuser_id',
        ];
        $this->pathImagem = public_path().'/imagens/midias';
        $this->sizesImagem = [
            'xs' => ['width' => 140, 'height' => 79],
            'sm' => ['width' => 480, 'height' => 270],
            'md' => ['width' => 580, 'height' => 326],
            'lg' => ['width' => 1170, 'height' => 658]
        ];
        $this->widthOriginal = true;

        $this->pathArquivo = public_path().'/arquivos/midias';
    }

    function index()
    {

        $midias = \App\Midia::all();
        //$idiomas = \App\Idioma::lists('titulo', 'id')->all();


        return view('cms::midia.listar', ['midias' => $midias/*, 'idiomas' => $idiomas*/]);
    }

    public function listar(Request $request)
    {

        //Log::info('CAMPOS: '.$request->campos);

        //Auth::loginUsingId(2);

        $campos = explode(", ", $request->campos);

        $midias = DB::table('midias')
            ->select($campos)
            ->where([
                [$request->campoPesquisa, 'ilike', "%$request->dadoPesquisa%"],
            ])
            ->orderBy($request->ordem, $request->sentido)
            ->paginate($request->itensPorPagina);
        return $midias;
    }


    public function inserir(Request $request)
    {

        $data = $request->all();

        $data['midia'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                $data['midia'] += [$campo => ''];
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
                $data['midia']['imagem'] = $filename;
            }
        }

        $successArquivo = true;
        if($arquivo!=null){
            $filenameArquivo = rand(1000,9999)."-".clean($arquivo->getClientOriginalName());
            $successArquivo = $arquivo->move($this->pathArquivo, $filenameArquivo);
            if($successArquivo){
                $data['midia']['arquivo'] = $filenameArquivo;
            }
        }


        if($successFile && $successArquivo){
            return $this->midia->create($data['midia']);
        }else{
            return "erro";
        }


        return $this->midia->create($data['midia']);

    }

    public function detalhar($id)
    {
        $midia = $this->midia->where([
            ['id', '=', $id],
        ])->firstOrFail();
        //$idiomas = \App\Idioma::lists('titulo', 'id')->all();

        return view('cms::midia.detalhar', ['midia' => $midia/*, 'idiomas' => $idiomas*/]);
    }

    /*public function alterar(Request $request, $id)
    {
        $data = $request->all();
        $data['midia'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                if($campo!='imagem'){
                    $data['midia'] += [$campo => ''];
                }
            }
        }
        $midia = $this->midia->where([
            ['id', '=', $id],
        ])->firstOrFail();

        $file = $request->file('file');

        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $success = $imagemCms->alterar($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal, $midia);
            if($success){
                $data['midia']['imagem'] = $filename;
                $midia->update($data['midia']);
                return $midia->imagem;
            }else{
                return "erro";
            }
        }

        //remover imagem
        if($data['removerImagem']){
            $data['midia']['imagem'] = '';
            if(file_exists($this->pathImagem."/".$midia->imagem)) {
                unlink($this->pathImagem . "/" . $midia->imagem);
            }
        }

        $midia->update($data['midia']);
        return "Gravado com sucesso";
    }*/

    public function alterar(Request $request, $id)
    {
        $data = $request->all();

        //return $data;

        $data['midia'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                if($campo!='imagem' && $campo!='arquivo'){
                    $data['midia'] += [$campo => ''];
                }
            }
        }
        $midia = $this->midia->where([
            ['id', '=', $id],
        ])->firstOrFail();


        $file = $request->file('file');
        $arquivo = $request->file('arquivo');

        //remover imagem
        if($data['removerImagem']){
            $data['midia']['imagem'] = '';
            if(file_exists($this->pathImagem."/".$midia->imagem)) {
                unlink($this->pathImagem . "/" . $midia->imagem);
            }
        }


        if($data['removerArquivo']){
            $data['midia']['arquivo'] = '';
            if(file_exists($this->pathArquivo."/".$midia->arquivo)) {
                unlink($this->pathArquivo . "/" . $midia->arquivo);
            }
        }


        $successFile = true;
        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $successFile = $imagemCms->alterar($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal, $midia);
            if($successFile){
                $data['midia']['imagem'] = $filename;
            }
        }

        $successArquivo = true;
        if($arquivo!=null){
            $filenameArquivo = rand(1000,9999)."-".clean($arquivo->getClientOriginalName());
            $successArquivo = $arquivo->move($this->pathArquivo, $filenameArquivo);
            if($successArquivo){
                $data['midia']['arquivo'] = $filenameArquivo;
            }
        }

        if($successFile && $successArquivo){

            $midia->update($data['midia']);
            return $midia->imagem;
        }else{
            return "erro";
        }

        //$midia->update($data['midia']);
        //return "Gravado com sucesso";
    }

    public function excluir($id)
    {
        //Auth::loginUsingId(2);

        $midia = $this->midia->where([
            ['id', '=', $id],
        ])->firstOrFail();

        //remover imagens
        if(!empty($midia->imagem)){
            //remover imagens
            $imagemCms = new ImagemCms();
            $imagemCms->excluir($this->pathImagem, $this->sizesImagem, $midia);
        }


        if(!empty($midia->arquivo)) {
            if (file_exists($this->pathArquivo . "/" . $midia->arquivo)) {
                unlink($this->pathArquivo . "/" . $midia->arquivo);
            }
        }

        $midia->delete();

    }
    public function status($id)
    {
        $midia_atual = DB::table('midias')->where('id', $id)->first();
        $status = $midia_atual->status == 0 ? 1 : 0;
        DB::table('midias')->where('id', $id)->update(['status' => $status]);

    }


}
