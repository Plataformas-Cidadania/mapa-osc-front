<?php

namespace Cms\Controllers;

use Cms\Models\ImagemCms;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Facades\Image;

class CategoriaController extends Controller
{



    public function __construct()
    {
        $this->categoria = new \App\Categoria;
        $this->campos = [
            'imagem', 'titulo', 'origin', 'cmsuser_id',
        ];
        $this->pathImagem = public_path().'/imagens/categorias';
        $this->sizesImagem = [
            'xs' => ['width' => 80, 'height' => 80],
            'sm' => ['width' => 170, 'height' => 170],
            'md' => ['width' => 300, 'height' => 300],
            'lg' => ['width' => 500, 'height' => 500]
        ];
        $this->widthOriginal = true;
    }

    function index($midia_id)
    {
        $midia = \App\Midia::where('id', $midia_id)->first();
        $categorias = \App\Categoria::all();


        return view('cms::categoria.listar', ['midia_id' => $midia->id, 'categorias' => $categorias]);
    }

    public function listar(Request $request)
    {

        $campos = explode(", ", $request->campos);

        $categorias = DB::table('categorias')
            ->select($campos)
            ->where([
                [$request->campoPesquisa, 'like', "%$request->dadoPesquisa%"],
                ['midia_id', $request->midia_id],
            ])
            ->orderBy($request->ordem, $request->sentido)
            ->paginate($request->itensPorPagina);
        return $categorias;
    }

    public function inserir(Request $request)
    {

        $data = $request->all();

        //return $data;

        $data['categoria'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                $data['categoria'] += [$campo => ''];
            }
        }

        $file = $request->file('file');

        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $success = $imagemCms->inserir($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal);

            if($success){
                $data['categoria']['imagem'] = $filename;
                return $this->categoria->create($data['categoria']);
            }else{
                return "erro";
            }
        }

        $insert = $this->categoria->create($data['categoria']);


        return $insert;

    }

    public function detalhar($id)
    {
        $categoria = $this->categoria->where([
            ['id', '=', $id],
        ])->firstOrFail();




        return view('cms::categoria.detalhar', ['categoria' => $categoria]);
    }

    public function alterar(Request $request, $id)
    {
        $data = $request->all();
        $data['categoria'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                if($campo!='imagem'){
                    $data['categoria'] += [$campo => ''];
                }
            }
        }
        $categoria = $this->categoria->where([
            ['id', '=', $id],
        ])->firstOrFail();

        $file = $request->file('file');

        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $success = $imagemCms->alterar($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal, $categoria);
            if($success){
                $data['categoria']['imagem'] = $filename;
                $categoria->update($data['categoria']);
                return $categoria->imagem;
            }else{
                return "erro";
            }
        }

        //remover imagem
        if($data['removerImagem']){
            $data['categoria']['imagem'] = '';
            if(file_exists($this->pathImagem."/".$categoria->imagem)) {
                unlink($this->pathImagem . "/" . $categoria->imagem);
            }
        }

        $categoria->update($data['categoria']);


        return "Gravado com sucesso";
    }

    public function excluir($id)
    {
        //Auth::loginUsingId(2);

        $categoria = $this->categoria->where([
            ['id', '=', $id],
        ])->firstOrFail();

        //remover imagens
        if(!empty($categoria->imagem)){
            //remover imagens
            $imagemCms = new ImagemCms();
            $imagemCms->excluir($this->pathImagem, $this->sizesImagem, $categoria);
        }


        $categoria->delete();

    }




}
