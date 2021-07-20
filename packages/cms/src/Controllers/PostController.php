<?php

namespace Cms\Controllers;

use Cms\Models\ImagemCms;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Facades\Image;

class PostController extends Controller
{



    public function __construct()
    {
        $this->post = new \App\Post;
        $this->campos = [
            'imagem', 'titulo', 'resumida', 'descricao', 'arquivo', 'data', 'cmsuser_id'
        ];
        $this->pathImagem = public_path().'/imagens/posts';
        $this->sizesImagem = [
            'xs' => ['width' => 140, 'height' => 140],
            'sm' => ['width' => 480, 'height' => 480],
            'md' => ['width' => 580, 'height' => 580],
            'lg' => ['width' => 1170, 'height' => 1170]
        ];
        $this->widthOriginal = true;

        $this->pathArquivo = public_path().'/arquivos/posts';
    }

    function index($categoria_id)
    {

        $categoria = \App\Categoria::where('id', $categoria_id)->first();
        $posts = \App\Post::all();
        $authors = \App\Integrante::where('conteudo', 1)->pluck('titulo', 'id')->all();
        //$idiomas = \App\Idioma::lists('titulo', 'id')->all();


        return view('cms::post.listar', ['posts' => $posts, 'categoria_id' => $categoria->id, 'authors' => $authors]);
        //return view('cms::post.listar', ['posts' => $posts, 'idiomas' => $idiomas]);
    }

    public function listar(Request $request)
    {

        //Log::info('CAMPOS: '.$request->campos);

        //Auth::loginUsingId(2);

        $campos = explode(", ", $request->campos);

        $posts = DB::table('posts')
            ->select($campos)
            ->where([
                [$request->campoPesquisa, 'ilike', "%$request->dadoPesquisa%"],
                ['categoria_id', $request->categoria_id],
            ])
            ->orderBy($request->ordem, $request->sentido)
            ->paginate($request->itensPorPagina);
        return $posts;
    }


    public function inserir(Request $request)
    {

        $data = $request->all();

        $data['post'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                $data['post'] += [$campo => ''];
            }
        }

        $file = $request->file('file');
        $arquivo = $request->file('arquivo');

	//Log::info($request);

        $successFile = true;
        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $successFile = $imagemCms->inserir($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal);
            if($successFile){
                $data['post']['imagem'] = $filename;
            }
        }

        $successArquivo = true;
        if($arquivo!=null){
            $filenameArquivo = rand(1000,9999)."-".clean($arquivo->getClientOriginalName());
            $successArquivo = $arquivo->move($this->pathArquivo, $filenameArquivo);
            if($successArquivo){
                $data['post']['arquivo'] = $filenameArquivo;
            }
        }


        if($successFile && $successArquivo){
            $insert =  $this->post->create($data['post']);
            /////////////////////////
            $authorArtigo = new \App\IntegrantePost;
            $dadosAuthorArtigo = Array();
            $dadosAuthorArtigo['post_id'] = $insert->id;

            //if($data['post']['integrante_post']!=1){
            foreach($data["integrante_post"] as $autor => $marcado){
                if($marcado=='true'){
                    $array_autor = explode('_', $autor);
                    $dadosAuthorArtigo['integrante_id'] = $array_autor[1];
                    $authorArtigo->create($dadosAuthorArtigo);
                }
            }
            //}
        }else{
            return "erro";
        }


        //$insert = $this->post->create($data['post']);


        return $insert;

    }

    public function detalhar($id)
    {
        $categorias = \App\Categoria::pluck('titulo', 'id')->all();
        $authors = \App\Integrante::where('conteudo', 1)->pluck('titulo', 'id')->all();
        $post = $this->post->where([
            ['id', '=', $id],
        ])->firstOrFail();
        //$idiomas = \App\Idioma::lists('titulo', 'id')->all();

        return view('cms::post.detalhar', ['post' => $post, 'categorias' => $categorias, 'authors' => $authors]);
        //return view('cms::post.detalhar', ['post' => $post, 'idiomas' => $idiomas]);
    }


    public function alterar(Request $request, $id)
    {
        $data = $request->all();

        //return $data;

        $data['post'] += ['cmsuser_id' => auth()->guard('cms')->user()->id];//adiciona id do usuario

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                if($campo!='imagem' && $campo!='arquivo'){
                    $data['post'] += [$campo => ''];
                }
            }
        }
        $post = $this->post->where([
            ['id', '=', $id],
        ])->firstOrFail();


        $file = $request->file('file');
        $arquivo = $request->file('arquivo');



        //remover imagem
        if($data['removerImagem']){
            $data['post']['imagem'] = '';
            if(file_exists($this->pathImagem."/".$post->imagem)) {
                unlink($this->pathImagem . "/" . $post->imagem);
            }
        }


        if($data['removerArquivo']){
            $data['post']['arquivo'] = '';
            if(file_exists($this->pathArquivo."/".$post->arquivo)) {
                unlink($this->pathArquivo . "/" . $post->arquivo);
            }
        }


        $successFile = true;
        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $successFile = $imagemCms->alterar($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal, $post);
            if($successFile){
                $data['post']['imagem'] = $filename;
            }
        }

        $successArquivo = true;
        if($arquivo!=null){
            $filenameArquivo = rand(1000,9999)."-".clean($arquivo->getClientOriginalName());
            $successArquivo = $arquivo->move($this->pathArquivo, $filenameArquivo);
            if($successArquivo){
                $data['post']['arquivo'] = $filenameArquivo;
            }
        }

        //////////////////////
        $authorArtigo = new \App\IntegrantePost();
        DB::table('integrantes_posts')->where('post_id', $id)->delete();
        $dadosAuthorArtigo = Array();
        $dadosAuthorArtigo['post_id'] = $id;

        //Log::info(in_array("true", $data["integrante_post"]));

        //if($data['artigo']['publicacao_atlas']!=1) {
            foreach ($data["integrante_post"] as $autor => $marcado) {
                if ($marcado == 'true') {
                    $array_autor = explode('_', $autor);
                    $dadosAuthorArtigo['integrante_id'] = $array_autor[1];
                    $authorArtigo->create($dadosAuthorArtigo);
                }
            }
        //}
        //////////////////////

        if($successFile && $successArquivo){

            $post->update($data['post']);
            return $post->imagem;
        }else{
            return "erro";
        }

        //$post->update($data['post']);
        //return "Gravado com sucesso";
    }

    public function excluir($id)
    {
        //Auth::loginUsingId(2);

        $post = $this->post->where([
            ['id', '=', $id],
        ])->firstOrFail();

        //remover imagens
        if(!empty($post->imagem)){
            //remover imagens
            $imagemCms = new ImagemCms();
            $imagemCms->excluir($this->pathImagem, $this->sizesImagem, $post);
        }


        if(!empty($post->arquivo)) {
            if (file_exists($this->pathArquivo . "/" . $post->arquivo)) {
                unlink($this->pathArquivo . "/" . $post->arquivo);
            }
        }

        $post->delete();

    }

    public function status($id)
    {
        $tipo_atual = DB::table('posts')->where('id', $id)->first();
        $status = $tipo_atual->status == 0 ? 1 : 0;
        DB::table('posts')->where('id', $id)->update(['status' => $status]);

    }

    public function destaque($id)
    {
        $tipo_atual = DB::table('posts')->where('id', $id)->first();
        $destaque = $tipo_atual->destaque == 0 ? 1 : 0;
        DB::table('posts')->where('id', $id)->update(['destaque' => $destaque]);

    }


}
