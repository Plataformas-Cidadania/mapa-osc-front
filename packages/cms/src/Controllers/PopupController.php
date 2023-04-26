<?php

namespace Cms\Controllers;

use Cms\Models\ImagemCms;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Facades\Image;

class PopupController extends Controller
{



    public function __construct()
    {
        $this->popup = new \App\Popup;
        $this->campos = [
            'imagem', 'titulo', 'descricao', 'url', 'posicao'
        ];
        $this->pathImagem = public_path().'/imagens/popups';
        $this->sizesImagem = [
            'xs' => ['width' => 140, 'height' => 79],
            'sm' => ['width' => 480, 'height' => 270],
            'md' => ['width' => 580, 'height' => 326],
            'lg' => ['width' => 1170, 'height' => 658]
        ];
        $this->widthOriginal = true;

        $this->pathArquivo = public_path().'/arquivos/popups';
    }

    function index()
    {

        $popups = \App\Popup::all();
        //$idiomas = \App\Idioma::lists('titulo', 'id')->all();


        return view('cms::popup.listar', ['popups' => $popups]);
        //return view('cms::popup.listar', ['popups' => $popups, 'idiomas' => $idiomas]);
    }

    public function listar(Request $request)
    {

        //Log::info('CAMPOS: '.$request->campos);

        //Auth::loginUsingId(2);

        $campos = explode(", ", $request->campos);

        $popups = DB::table('popups')
            ->select($campos)
            ->where([
                [$request->campoPesquisa, 'ilike', "%$request->dadoPesquisa%"],
            ])
            ->orderBy($request->ordem, $request->sentido)
            ->paginate($request->itensPorPagina);
        return $popups;
    }


    public function inserir(Request $request)
    {

        $data = $request->all();

        $data['popup'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                $data['popup'] += [$campo => ''];
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
                $data['popup']['imagem'] = $filename;
            }
        }

        $successArquivo = true;
        if($arquivo!=null){
            $filenameArquivo = rand(1000,9999)."-".clean($arquivo->getClientOriginalName());
            $successArquivo = $arquivo->move($this->pathArquivo, $filenameArquivo);
            if($successArquivo){
                $data['popup']['arquivo'] = $filenameArquivo;
            }
        }


        if($successFile && $successArquivo){
            return $this->popup->create($data['popup']);
        }else{
            return "erro";
        }


        return $this->popup->create($data['popup']);

    }

    public function detalhar($id)
    {
        $popup = $this->popup->where([
            ['id', '=', $id],
        ])->firstOrFail();
        //$idiomas = \App\Idioma::lists('titulo', 'id')->all();

        return view('cms::popup.detalhar', ['popup' => $popup]);
        //return view('cms::popup.detalhar', ['popup' => $popup, 'idiomas' => $idiomas]);
    }

    /*public function alterar(Request $request, $id)
    {
        $data = $request->all();
        $data['popup'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                if($campo!='imagem'){
                    $data['popup'] += [$campo => ''];
                }
            }
        }
        $popup = $this->popup->where([
            ['id', '=', $id],
        ])->firstOrFail();

        $file = $request->file('file');

        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $success = $imagemCms->alterar($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal, $popup);
            if($success){
                $data['popup']['imagem'] = $filename;
                $popup->update($data['popup']);
                return $popup->imagem;
            }else{
                return "erro";
            }
        }

        //remover imagem
        if($data['removerImagem']){
            $data['popup']['imagem'] = '';
            if(file_exists($this->pathImagem."/".$popup->imagem)) {
                unlink($this->pathImagem . "/" . $popup->imagem);
            }
        }

        $popup->update($data['popup']);
        return "Gravado com sucesso";
    }*/

    public function alterar(Request $request, $id)
    {
        $data = $request->all();

        //return $data;

        $data['popup'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                if($campo!='imagem' && $campo!='arquivo'){
                    $data['popup'] += [$campo => ''];
                }
            }
        }
        $popup = $this->popup->where([
            ['id', '=', $id],
        ])->firstOrFail();


        $file = $request->file('file');
        $arquivo = $request->file('arquivo');



        //remover imagem
        if($data['removerImagem']){
            $data['popup']['imagem'] = '';
            if(file_exists($this->pathImagem."/".$popup->imagem)) {
                unlink($this->pathImagem . "/" . $popup->imagem);
            }
        }


        if($data['removerArquivo']){
            $data['popup']['arquivo'] = '';
            if(file_exists($this->pathArquivo."/".$popup->arquivo)) {
                unlink($this->pathArquivo . "/" . $popup->arquivo);
            }
        }


        $successFile = true;
        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $successFile = $imagemCms->alterar($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal, $popup);
            if($successFile){
                $data['popup']['imagem'] = $filename;
            }
        }

        $successArquivo = true;
        if($arquivo!=null){
            $filenameArquivo = rand(1000,9999)."-".clean($arquivo->getClientOriginalName());
            $successArquivo = $arquivo->move($this->pathArquivo, $filenameArquivo);
            if($successArquivo){
                $data['popup']['arquivo'] = $filenameArquivo;
            }
        }

        if($successFile && $successArquivo){

            $popup->update($data['popup']);
            return $popup->imagem;
        }else{
            return "erro";
        }

        //$popup->update($data['popup']);
        //return "Gravado com sucesso";
    }

    public function excluir($id)
    {
        //Auth::loginUsingId(2);

        $popup = $this->popup->where([
            ['id', '=', $id],
        ])->firstOrFail();

        //remover imagens
        if(!empty($popup->imagem)){
            //remover imagens
            $imagemCms = new ImagemCms();
            $imagemCms->excluir($this->pathImagem, $this->sizesImagem, $popup);
        }


        if(!empty($popup->arquivo)) {
            if (file_exists($this->pathArquivo . "/" . $popup->arquivo)) {
                unlink($this->pathArquivo . "/" . $popup->arquivo);
            }
        }

        $popup->delete();

    }

    public function status($id)
    {
        $tipo_atual = DB::table('popups')->where('id', $id)->first();
        $status = $tipo_atual->status == 0 ? 1 : 0;
        DB::table('popups')->where('id', $id)->update(['status' => $status]);

    }

    public function positionUp($id)
    {

        $posicao_atual = DB::table('popups')->where('id', $id)->first();
        $upPosicao = $posicao_atual->posicao-1;
        $posicao = $posicao_atual->posicao;

        //Coloca com a posicao do anterior
        DB::table('popups')->where('posicao', $upPosicao)->update(['posicao' => $posicao]);

        //atualiza a posicao para o anterior
        DB::table('popups')->where('id', $id)->update(['posicao' => $upPosicao]);


    }

    public function positionDown($id)
    {

        $posicao_atual = DB::table('popups')->where('id', $id)->first();
        $upPosicao = $posicao_atual->posicao+1;
        $posicao = $posicao_atual->posicao;

        //Coloca com a posicao do anterior
        DB::table('popups')->where('posicao', $upPosicao)->update(['posicao' => $posicao]);

        //atualiza a posicao para o anterior
        DB::table('popups')->where('id', $id)->update(['posicao' => $upPosicao]);

    }


}
