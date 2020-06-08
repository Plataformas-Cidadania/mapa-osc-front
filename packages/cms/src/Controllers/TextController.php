<?php

namespace Cms\Controllers;

use Cms\Models\ImagemCms;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Facades\Image;

class TextController extends Controller
{

    public function __construct()
    {
        $this->text = new \App\Text;
        $this->campos = [
            'imagem', 'titulo', 'descricao', 'slug', 'cmsuser_id',
        ];
        $this->pathImagem = public_path().'/imagens/texts';
        $this->sizesImagem = [
            'xs' => ['width' => 360, 'height' => 130],
            'sm' => ['width' => 400, 'height' => 144],
            'md' => ['width' => 600, 'height' => 220]
        ];
        $this->widthOriginal = true;
    }

    function index()
    {

        $texts = \App\Text::all();

        return view('cms::text.listar', ['texts' => $texts]);
    }

    public function listar(Request $request)
    {

        //Log::info('CAMPOS: '.$request->campos);

        //Auth::loginUsingId(2);

        $campos = explode(", ", $request->campos);

        $texts = DB::table('texts')
            ->select($campos)
            ->where([
                [$request->campoPesquisa, 'like', "%$request->dadoPesquisa%"],
            ])
            ->orderBy($request->ordem, $request->sentido)
            ->paginate($request->itensPorPagina);
        return $texts;
    }

    public function inserir(Request $request)
    {

        $data = $request->all();

        $data['text'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                $data['text'] += [$campo => ''];
            }
        }

        $file = $request->file('file');

        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $success = $imagemCms->inserir($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal);

            if($success){
                $data['text']['imagem'] = $filename;
                return $this->text->create($data['text']);
            }else{
                return "erro";
            }
        }

        return $this->text->create($data['text']);

    }

    public function detalhar($id)
    {
        $text = $this->text->where([
            ['id', '=', $id],
        ])->firstOrFail();
        return view('cms::text.detalhar', ['text' => $text]);
    }

    public function alterar(Request $request, $id)
    {
        $data = $request->all();
        $data['text'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                if($campo!='imagem'){
                    $data['text'] += [$campo => ''];
                }
            }
        }
        $text = $this->text->where([
            ['id', '=', $id],
        ])->firstOrFail();

        $file = $request->file('file');

        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $success = $imagemCms->alterar($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal, $text);
            if($success){
                $data['text']['imagem'] = $filename;
                $text->update($data['text']);
                return $text->imagem;
            }else{
                return "erro";
            }
        }

        //remover imagem
        if($data['removerImagem']){
            $data['text']['imagem'] = '';
            if(file_exists($this->pathImagem."/".$text->imagem)) {
                unlink($this->pathImagem . "/" . $text->imagem);
            }
        }

        $text->update($data['text']);
        return "Gravado com sucesso";
    }

    public function excluir($id)
    {
        //Auth::loginUsingId(2);

        $text = $this->text->where([
            ['id', '=', $id],
        ])->firstOrFail();

        //remover imagens
        if(!empty($text->imagem)){
            //remover imagens
            $imagemCms = new ImagemCms();
            $imagemCms->excluir($this->pathImagem, $this->sizesImagem, $text);
        }


        $text->delete();

    }





}
