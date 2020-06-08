<?php

namespace Cms\Controllers;

use Cms\Models\ImagemCms;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Facades\Image;

class DirectiveController extends Controller
{



    public function __construct()
    {
        $this->directive = new \App\Directive;
        $this->campos = [
            'imagem', 'type', 'title', 'description', 'cmsuser_id',
        ];
        $this->pathImagem = public_path().'/imagens/directives';
        $this->sizesImagem = [
            'xs' => ['width' => 140, 'height' => 140],
            'sm' => ['width' => 480, 'height' => 480],
            'md' => ['width' => 700, 'height' => 700],
            'lg' => ['width' => 800, 'height' => 800]
        ];
        $this->widthOriginal = true;
    }

    function index()
    {

        $directives = \App\Directive::all();


        return view('cms::directive.listar', ['directives' => $directives]);
    }

    public function listar(Request $request)
    {

        //Log::info('CAMPOS: '.$request->campos);

        //Auth::loginUsingId(2);

        $campos = explode(", ", $request->campos);

        $directives = DB::table('directives')
            ->select($campos)
            ->where([
                [$request->campoPesquisa, 'like', "%$request->dadoPesquisa%"],
            ])
            ->orderBy($request->ordem, $request->sentido)
            ->paginate($request->itensPorPagina);
        return $directives;
    }

    public function inserir(Request $request)
    {

        $data = $request->all();

        $data['directive'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                $data['directive'] += [$campo => ''];
            }
        }

        $file = $request->file('file');

        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $success = $imagemCms->inserir($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal);

            if($success){
                $data['directive']['imagem'] = $filename;
                return $this->directive->create($data['directive']);
            }else{
                return "erro";
            }
        }

        return $this->directive->create($data['directive']);

    }

    public function detalhar($id)
    {
        $directive = $this->directive->where([
            ['id', '=', $id],
        ])->firstOrFail();


        return view('cms::directive.detalhar', ['directive' => $directive]);
    }

    public function alterar(Request $request, $id)
    {
        $data = $request->all();
        $data['directive'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                if($campo!='imagem'){
                    $data['directive'] += [$campo => ''];
                }
            }
        }
        $directive = $this->directive->where([
            ['id', '=', $id],
        ])->firstOrFail();

        $file = $request->file('file');

        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $success = $imagemCms->alterar($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal, $directive);
            if($success){
                $data['directive']['imagem'] = $filename;
                $directive->update($data['directive']);
                return $directive->imagem;
            }else{
                return "erro";
            }
        }

        //remover imagem
        if($data['removerImagem']){
            $data['directive']['imagem'] = '';
            if(file_exists($this->pathImagem."/".$directive->imagem)) {
                unlink($this->pathImagem . "/" . $directive->imagem);
            }
        }

        $directive->update($data['directive']);
        return "Gravado com sucesso";
    }

    public function excluir($id)
    {
        //Auth::loginUsingId(2);

        $directive = $this->directive->where([
            ['id', '=', $id],
        ])->firstOrFail();

        //remover imagens
        if(!empty($directive->imagem)){
            //remover imagens
            $imagemCms = new ImagemCms();
            $imagemCms->excluir($this->pathImagem, $this->sizesImagem, $directive);
        }


        $directive->delete();

    }




}
