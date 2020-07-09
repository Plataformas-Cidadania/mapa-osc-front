<?php

namespace Cms\Controllers;

use Cms\Models\ImagemCms;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Facades\Image;

class ArtworkController extends Controller
{



    public function __construct()
    {
        $this->artwork = new \App\Artwork;
        $this->campos = [
            'imagem', 'title', 'version', 'format', 'cmsuser_id',
        ];
        $this->pathImagem = public_path().'/imagens/artworks';
        $this->sizesImagem = [
            'xs' => ['width' => 140, 'height' => 79],
            'sm' => ['width' => 480, 'height' => 270],
            'md' => ['width' => 580, 'height' => 326],

            '72' => ['width' => 72, 'height' => 72],
            '96' => ['width' => 96, 'height' => 96],
            '114' => ['width' => 114, 'height' => 114],
            '128' => ['width' => 128, 'height' => 128],
            '144' => ['width' => 144, 'height' => 144],
            '256' => ['width' => 256, 'height' => 256],
            '512' => ['width' => 512, 'height' => 512],
            '1024' => ['width' => 1024, 'height' => 658],
            '2048' => ['width' => 2048, 'height' => 2048]
        ];
        $this->widthOriginal = true;
    }

    function index()
    {

        $artworks = \App\Artwork::all();

        return view('cms::artwork.listar', ['artworks' => $artworks]);
    }

    public function listar(Request $request)
    {

        //Log::info('CAMPOS: '.$request->campos);

        //Auth::loginUsingId(2);

        $campos = explode(", ", $request->campos);

        $artworks = DB::table('artworks')
            ->select($campos)
            ->where([
                [$request->campoPesquisa, 'like', "%$request->dadoPesquisa%"],
            ])
            ->orderBy($request->ordem, $request->sentido)
            ->paginate($request->itensPorPagina);
        return $artworks;
    }

    public function inserir(Request $request)
    {

        $data = $request->all();

        $data['artwork'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                $data['artwork'] += [$campo => ''];
            }
        }

        $file = $request->file('file');

        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $success = $imagemCms->inserir($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal);

            if($success){
                $data['artwork']['imagem'] = $filename;
                return $this->artwork->create($data['artwork']);
            }else{
                return "erro";
            }
        }

        return $this->artwork->create($data['artwork']);

    }

    public function detalhar($id)
    {
        $artwork = $this->artwork->where([
            ['id', '=', $id],
        ])->firstOrFail();


        return view('cms::artwork.detalhar', ['artwork' => $artwork]);
    }

    public function alterar(Request $request, $id)
    {
        $data = $request->all();
        $data['artwork'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                if($campo!='imagem'){
                    $data['artwork'] += [$campo => ''];
                }
            }
        }
        $artwork = $this->artwork->where([
            ['id', '=', $id],
        ])->firstOrFail();

        $file = $request->file('file');

        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $success = $imagemCms->alterar($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal, $artwork);
            if($success){
                $data['artwork']['imagem'] = $filename;
                $artwork->update($data['artwork']);
                return $artwork->imagem;
            }else{
                return "erro";
            }
        }

        //remover imagem
        if($data['removerImagem']){
            $data['artwork']['imagem'] = '';
            if(file_exists($this->pathImagem."/".$artwork->imagem)) {
                unartwork($this->pathImagem . "/" . $artwork->imagem);
            }
        }

        $artwork->update($data['artwork']);
        return "Gravado com sucesso";
    }

    public function excluir($id)
    {
        //Auth::loginUsingId(2);

        $artwork = $this->artwork->where([
            ['id', '=', $id],
        ])->firstOrFail();

        //remover imagens
        if(!empty($artwork->imagem)){
            //remover imagens
            $imagemCms = new ImagemCms();
            $imagemCms->excluir($this->pathImagem, $this->sizesImagem, $artwork);
        }

        $artwork->delete();

    }




}
