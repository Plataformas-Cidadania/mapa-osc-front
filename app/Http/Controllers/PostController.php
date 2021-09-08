<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Mockery\Exception;

class PostController extends Controller
{


    public function post($midia_id=0){
        return view('post.list', ['midia_id' => $midia_id]);
    }

    public function details($id, $titulo = null){
        $detail = \App\Post::find($id);

        $lasts = \App\Post::
        where('id', '!=', $detail->id)
            ->orderBy('id', 'desc')
            ->take(4)
            ->get();

        $members = \App\Integrante::where('conteudo', 1)
            ->select('integrantes.titulo', 'integrantes.imagem')
            ->join('integrantes_posts', 'integrantes_posts.integrante_id', 'integrantes.id')
            ->join('posts', 'integrantes_posts.post_id', 'posts.id')
            ->where('posts.id', $id)
            ->get();

        return view('post.detail', [
            'detail' => $detail,
            'lasts' => $lasts,
            'members' => $members
        ]);
    }

    public function listing($parameters = null){

        if($parameters!=null){
            $array = explode('=', $parameters);
            return view('ad.list', ['filtros' => $array[1]]);
        }

        return view('ad.list', ['filtros' => null]);
    }

    public function categories(Request $request){

        $categories = \App\Categoria::select(
            DB::Raw("
                categorias.id,
                categorias.titulo,
                count(categorias.id) as qtd
            "))
            ->join('midias', 'midias.id', '=', 'categorias.midia_id')
            ->join('posts', 'categorias.id', '=', 'posts.categoria_id')
            ->where('posts.titulo', 'ilike', $request->search.'%')
            ->where('midias.id', $request->midia_id)
            ->groupBy('categorias.id', 'categorias.titulo')
            ->distinct()
            ->get();

        return $categories;
    }

    public function members(Request $request){

        $members = \App\Integrante::
            select(
            DB::Raw("
                integrantes.id,
                integrantes.titulo,
                count(integrantes.id) as qtd,
                max(integrantes.imagem) as imagem
            ")
        )
            ->join('integrantes_posts', 'integrantes_posts.integrante_id', 'integrantes.id')
            ->join('posts', 'integrantes_posts.post_id', 'posts.id')
            ->join('categorias', 'posts.categoria_id', 'categorias.id')
            ->join('midias', 'categorias.midia_id', 'midias.id')
            ->where([
                ['integrantes.titulo', 'ilike', $request->search.'%'],
                ['integrantes.conteudo', 1]
            ])
            ->where('midias.id', $request->midia_id)
            ->groupBy('integrantes.id', 'integrantes.titulo', 'midias.id', 'categorias.id')
            ->get();


        return $members;
    }

    public function archives(Request $request){

        $archives = \App\Post::
            select(
                DB::Raw("
                to_char(posts.data, 'YYYY-MM') as date_menu,
                count(posts.data) as qtd,
                to_char(posts.data, 'TMMonth') as month,
                to_char(posts.data, 'YYYY') as year
                "))
            ->join('categorias', 'posts.categoria_id', 'categorias.id')
            ->where('categorias.midia_id', $request->midia_id)
            ->groupBy('date_menu', 'month', 'year')
            ->orderby('date_menu', 'desc')
            ->distinct('date_menu')
            ->get();

        return $archives;
    }

    public function getList(Request $request){

        $search = '';
        if (is_array($request->filters) && array_key_exists('search', $request->filters)) {
            $search = $request->filters['search'];
        }

        $categories = [];
        if (is_array($request->filters) && array_key_exists('categories', $request->filters)) {
            $categories = $request->filters['categories'];
        }

        $members = [];
        if (is_array($request->filters) && array_key_exists('members', $request->filters)) {
            $members = $request->filters['members'];
        }

        $archives = [];
        if (is_array($request->filters) && array_key_exists('archives', $request->filters)) {
            $archives = $request->filters['archives'];
        }

        $total = \App\Post::select('*')
            ->when(count($categories) > 0, function($query) use ($categories){
                return $query->whereIn('categoria_id', $categories);
            })
            ->get();

        $total = count($total);

        $result = \App\Post::select(
                DB::Raw("
                posts.*,
                to_char(posts.data, 'HH12:MI:SS') as hour,
                to_char(posts.data, 'DD') as date,
                to_char(posts.data, 'TMMonth') as month,
                to_char(posts.data, 'YYYY') as year,
                posts.titulo,
                posts.resumida,
                posts.descricao
                ")
            )
            ->join('categorias', 'categorias.id', 'posts.categoria_id')
            ->join('midias', 'midias.id', 'categorias.midia_id')
            ->when(count($categories) > 0, function($query) use ($categories){
                return $query->whereIn('categoria_id', $categories);
            })
            ->when(count($members) > 0, function($query) use ($members){
                return $query->whereIn('member_id', $members);
            })
            ->when(count($archives) > 0, function($query) use ($archives){
                return $query->whereIn(DB::Raw("to_char(posts.date, 'YYYY-MM')"), $archives);
            })
            ->where('posts.titulo', 'ilike', '%'.$search.'%')
            ->where('posts.titulo', 'ilike', '%'.$search.'%')
            ->where('midias.id', $request->midia_id)
            ->orderby($request->order, $request->directionOrder)
            ->distinct('posts.id')
            ->take($request->qtdItemsLoad)
            ->get();


        $ads['total'] = $total;
        $ads['data'] = $result;


        foreach($ads['data'] as $index => $ad){
            $categories = DB::table('categorias')
                ->select('categorias.*')
                ->join('midias', 'midias.id', 'categorias.midia_id')
                ->where('categorias.id', $ad->id)
                ->get();
            $ads['data'][$index]->categories = $categories;
        }


        return $ads;
    }




}
