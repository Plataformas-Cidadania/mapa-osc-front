<?php

namespace Cms\Controllers;

use Cms\Models\ImagemCms;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Facades\Image;

class TeaserController extends Controller
{

    public function __construct()
    {
        $this->teaser = new \App\Teaser;
        $this->campos = [
            'imagem', 'titulo', 'teaser', 'descricao', 'posicao', 'url', 'cmsuser_id',
        ];
        $this->pathImagem = public_path().'/imagens/teasers';
        $this->sizesImagem = [
            'xs' => ['width' => 360, 'height' => 130],
            'sm' => ['width' => 400, 'height' => 144],
            'md' => ['width' => 600, 'height' => 220]
        ];
        $this->widthOriginal = true;
    }

    function index()
    {

        $teasers = \App\Teaser::all();

        return view('cms::teaser.listar', ['teasers' => $teasers]);
    }

    public function listar(Request $request)
    {

        //Log::info('CAMPOS: '.$request->campos);

        //Auth::loginUsingId(2);

        $campos = explode(", ", $request->campos);

        $teasers = DB::table('teasers')
            ->select($campos)
            ->where([
                [$request->campoPesquisa, 'like', "%$request->dadoPesquisa%"],
            ])
            ->orderBy($request->ordem, $request->sentido)
            ->paginate($request->itensPorPagina);
        return $teasers;
    }

    public function inserir(Request $request)
    {

        $data = $request->all();

        $data['teaser'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                $data['teaser'] += [$campo => ''];
            }
        }

        $file = $request->file('file');

        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $success = $imagemCms->inserir($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal);

            if($success){
                $data['teaser']['imagem'] = $filename;
                return $this->teaser->create($data['teaser']);
            }else{
                return "erro";
            }
        }

        return $this->teaser->create($data['teaser']);

    }

    public function detalhar($id)
    {
        $teaser = $this->teaser->where([
            ['id', '=', $id],
        ])->firstOrFail();
        return view('cms::teaser.detalhar', ['teaser' => $teaser]);
    }

    public function alterar(Request $request, $id)
    {
        $data = $request->all();
        $data['teaser'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                if($campo!='imagem'){
                    $data['teaser'] += [$campo => ''];
                }
            }
        }
        $teaser = $this->teaser->where([
            ['id', '=', $id],
        ])->firstOrFail();

        $file = $request->file('file');

        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $success = $imagemCms->alterar($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal, $teaser);
            if($success){
                $data['teaser']['imagem'] = $filename;
                $teaser->update($data['teaser']);
                return $teaser->imagem;
            }else{
                return "erro";
            }
        }

        //remover imagem
        if($data['removerImagem']){
            $data['teaser']['imagem'] = '';
            if(file_exists($this->pathImagem."/".$teaser->imagem)) {
                unlink($this->pathImagem . "/" . $teaser->imagem);
            }
        }

        $teaser->update($data['teaser']);
        return "Gravado com sucesso";
    }

    public function excluir($id)
    {
        //Auth::loginUsingId(2);

        $teaser = $this->teaser->where([
            ['id', '=', $id],
        ])->firstOrFail();

        //remover imagens
        if(!empty($teaser->imagem)){
            //remover imagens
            $imagemCms = new ImagemCms();
            $imagemCms->excluir($this->pathImagem, $this->sizesImagem, $teaser);
        }


        $teaser->delete();

    }

    public function positionUp($id)
    {

        $posicao_atual = DB::table('teasers')->where('id', $id)->first();
        $upPosicao = $posicao_atual->posicao-1;
        $posicao = $posicao_atual->posicao;

        //Coloca com a posicao do anterior
        DB::table('teasers')->where('posicao', $upPosicao)->update(['posicao' => $posicao]);

        //atualiza a posicao para o anterior
        DB::table('teasers')->where('id', $id)->update(['posicao' => $upPosicao]);


    }

    public function positionDown($id)
    {

        $posicao_atual = DB::table('teasers')->where('id', $id)->first();
        $upPosicao = $posicao_atual->posicao+1;
        $posicao = $posicao_atual->posicao;

        //Coloca com a posicao do anterior
        DB::table('teasers')->where('posicao', $upPosicao)->update(['posicao' => $posicao]);

        //atualiza a posicao para o anterior
        DB::table('teasers')->where('id', $id)->update(['posicao' => $upPosicao]);

    }




}
