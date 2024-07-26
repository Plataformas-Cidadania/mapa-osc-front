<?php

namespace Cms\Controllers;

use Cms\Models\ImagemCms;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Facades\Image;

class SubitemController extends Controller
{



    public function __construct()
    {
        $this->subitem = new \App\Subitem;
        $this->campos = [
            'imagem', 'titulo', 'descricao', 'arquivo', 'item_id', 'posicao', 'video', 'url', 'cmsuser_id',
        ];
        $this->pathImagem = public_path().'/imagens/subitems';
        $this->sizesImagem = [
            'xs' => ['width' => 140, 'height' => 79],
            'sm' => ['width' => 480, 'height' => 270],
            'md' => ['width' => 580, 'height' => 326],
            'lg' => ['width' => 1170, 'height' => 658]
        ];
        $this->widthOriginal = true;

        $this->pathArquivo = public_path().'/arquivos/subitems';
    }

    function index($item_id)
    {

        $subitems = \App\Subitem::all();
        //$idiomas = \App\Idioma::lists('titulo', 'id')->all();

        return view('cms::subitems.listar', ['subitems' => $subitems, 'item_id' => $item_id]);
        //return view('cms::subitem.listar', ['subitems' => $subitems, 'item_id' => $item_id, 'idiomas' => $idiomas]);
    }

    public function listar(Request $request)
    {

        //Log::info('CAMPOS: '.$request->campos);
        Log::info('item_id: '.$request->item_id);

        //Auth::loginUsingId(2);

        $campos = explode(", ", $request->campos);

        $subitems = DB::table('subitems')
            ->select($campos)
            ->where([
                [$request->campoPesquisa, 'ilike', "%$request->dadoPesquisa%"],
                ['item_id', $request->item_id],
            ])
            ->orderBy($request->ordem, $request->sentido)
            ->paginate($request->itensPorPagina);
        return $subitems;
    }


    public function inserir(Request $request)
    {

        $data = $request->all();

        $data['subitem'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                $data['subitem'] += [$campo => ''];
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
                $data['subitem']['imagem'] = $filename;
            }
        }

        $successArquivo = true;
        if($arquivo!=null){
            $filenameArquivo = rand(1000,9999)."-".clean($arquivo->getClientOriginalName());
            $successArquivo = $arquivo->move($this->pathArquivo, $filenameArquivo);
            if($successArquivo){
                $data['subitem']['arquivo'] = $filenameArquivo;
            }
        }


        if($successFile && $successArquivo){
            return $this->subitem->create($data['subitem']);
        }else{
            return "erro";
        }


        return $this->subitem->create($data['subitem']);

    }

    public function detalhar($id)
    {
        $subitem = $this->subitem->where([
            ['id', '=', $id],
        ])->firstOrFail();
        //$idiomas = \App\Idioma::lists('titulo', 'id')->all();

        $item_id = $subitem->item_id;

        return view('cms::subitems.detalhar', ['subitem' => $subitem, 'item_id' => $item_id]);
        //return view('cms::subitem.detalhar', ['subitem' => $subitem, 'item_id' => $item_id, 'idiomas' => $idiomas]);
    }

    /*public function alterar(Request $request, $id)
    {
        $data = $request->all();
        $data['subitem'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                if($campo!='imagem'){
                    $data['subitem'] += [$campo => ''];
                }
            }
        }
        $subitem = $this->subitem->where([
            ['id', '=', $id],
        ])->firstOrFail();

        $file = $request->file('file');

        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $success = $imagemCms->alterar($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal, $subitem);
            if($success){
                $data['subitem']['imagem'] = $filename;
                $subitem->update($data['subitem']);
                return $subitem->imagem;
            }else{
                return "erro";
            }
        }

        //remover imagem
        if($data['removerImagem']){
            $data['subitem']['imagem'] = '';
            if(file_exists($this->pathImagem."/".$subitem->imagem)) {
                unlink($this->pathImagem . "/" . $subitem->imagem);
            }
        }

        $subitem->update($data['subitem']);
        return "Gravado com sucesso";
    }*/

    public function alterar(Request $request, $id)
    {
        $data = $request->all();

        //return $data;

        $data['subitem'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                if($campo!='imagem' && $campo!='arquivo'){
                    $data['subitem'] += [$campo => ''];
                }
            }
        }
        $subitem = $this->subitem->where([
            ['id', '=', $id],
        ])->firstOrFail();


        $file = $request->file('file');
        $arquivo = $request->file('arquivo');

        //remover imagem
        if($data['removerImagem']){
            $data['subitem']['imagem'] = '';
            if(file_exists($this->pathImagem."/".$subitem->imagem)) {
                unlink($this->pathImagem . "/" . $subitem->imagem);
            }
        }


        if($data['removerArquivo']){
            $data['subitem']['arquivo'] = '';
            if(file_exists($this->pathArquivo."/".$subitem->arquivo)) {
                unlink($this->pathArquivo . "/" . $subitem->arquivo);
            }
        }


        $successFile = true;
        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $successFile = $imagemCms->alterar($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal, $subitem);
            if($successFile){
                $data['subitem']['imagem'] = $filename;
            }
        }

        $successArquivo = true;
        if($arquivo!=null){
            $filenameArquivo = rand(1000,9999)."-".clean($arquivo->getClientOriginalName());
            $successArquivo = $arquivo->move($this->pathArquivo, $filenameArquivo);
            if($successArquivo){
                $data['subitem']['arquivo'] = $filenameArquivo;
            }
        }

        if($successFile && $successArquivo){

            $subitem->update($data['subitem']);
            return $subitem->imagem;
        }else{
            return "erro";
        }

        //$subitem->update($data['subitem']);
        //return "Gravado com sucesso";
    }

    public function excluir($id)
    {
        //Auth::loginUsingId(2);

        $subitem = $this->subitem->where([
            ['id', '=', $id],
        ])->firstOrFail();

        //remover imagens
        if(!empty($subitem->imagem)){
            //remover imagens
            $imagemCms = new ImagemCms();
            $imagemCms->excluir($this->pathImagem, $this->sizesImagem, $subitem);
        }


        if(!empty($subitem->arquivo)) {
            if (file_exists($this->pathArquivo . "/" . $subitem->arquivo)) {
                unlink($this->pathArquivo . "/" . $subitem->arquivo);
            }
        }

        $subitem->delete();

    }

    public function status($id)
    {
        $tipo_atual = DB::table('subitems')->where('id', $id)->first();
        $status = $tipo_atual->status == 0 ? 1 : 0;
        DB::table('subitems')->where('id', $id)->update(['status' => $status]);

    }

    public function positionUp($id)
    {
        $posicao_atual = DB::table('subitems')->where('id', $id)->first();
        $upPosicao = $posicao_atual->posicao-1;
        $posicao = $posicao_atual->posicao;

        //Coloca com a posicao do anterior
        DB::table('subitems')->where('posicao', $upPosicao)->update(['posicao' => $posicao]);

        //atualiza a posicao para o anterior
        DB::table('subitems')->where('id', $id)->update(['posicao' => $upPosicao]);


    }

    public function positionDown($id)
    {
        $posicao_atual = DB::table('subitems')->where('id', $id)->first();
        $upPosicao = $posicao_atual->posicao+1;
        $posicao = $posicao_atual->posicao;

        //Coloca com a posicao do anterior
        DB::table('subitems')->where('posicao', $upPosicao)->update(['posicao' => $posicao]);

        //atualiza a posicao para o anterior
        DB::table('subitems')->where('id', $id)->update(['posicao' => $upPosicao]);

    }


}
