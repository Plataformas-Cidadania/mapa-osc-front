<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Mockery\Exception;

class PostController extends Controller
{

    public function __construct(){
        $this->obj = new \App\Noticia();
        $this->module = 'noticias';

    }

    public function post($type){
        return view('post.list', ['type' => $type]);
    }

    public function details($id, $titulo = null){
        return view('ad.details', ['id' => $id]);
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
            ->join('noticias', 'categorias.id', '=', 'noticias.categoria_id')
            ->where('noticias.titulo', 'ilike', $request->search.'%')
            ->groupBy('categorias.id', 'categorias.titulo')
            ->distinct()
            ->get();

        return $categories;
    }

    public function members(Request $request){

        $members = \App\Integrante::
            select(
            DB::Raw("
                id,
                titulo,
                count(id) as qtd
            ")
        )
            ->where([
                ['titulo', 'ilike', $request->search.'%'],
                ['conteudo', 1]
            ])
            ->groupBy('id', 'titulo')
            ->get();

        return $members;
    }

    public function archives(Request $request){

        $archives = $this->obj
            ->select(
                DB::Raw("
                to_char(data, 'YYYY-MM') as date_menu,
                count(data) as qtd,
                to_char(data, 'TMMonth') as month,
                to_char(data, 'YYYY') as year
                "))
            ->groupBy('date_menu', 'month', 'year')
            ->orderby('date_menu')
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

        $total = $this->obj
            ->select('*')
            ->when(count($categories) > 0, function($query) use ($categories){
                return $query->whereIn('categoria_id', $categories);
            })
            ->get();

        $total = count($total);

        $result = $this->obj
            ->select(
                DB::Raw("
                *,
                to_char(data, 'HH12:MI:SS') as hour,
                to_char(data, 'DD') as date,
                to_char(data, 'TMMonth') as month,
                to_char(data, 'YYYY') as year,
                titulo,
                resumida,
                descricao
                ")
            )
            ->when(count($categories) > 0, function($query) use ($categories){
                return $query->whereIn('categoria_id', $categories);
            })
            ->when(count($members) > 0, function($query) use ($members){
                return $query->whereIn('member_id', $members);
            })
            ->when(count($archives) > 0, function($query) use ($archives){
                return $query->whereIn(DB::Raw("to_char(date, 'YYYY-MM')"), $archives);
            })
            ->where('titulo', 'ilike', '%'.$search.'%')
            ->orderby($request->order, $request->directionOrder)
            ->distinct('id')
            ->take($request->qtdItemsLoad)
            ->get();

        /*foreach ($result as $item) {
            $item->qtd_comments = \App\PubComment::where('origin_id', $item->id)->count();
        }*/

        $ads['total'] = $total;
        $ads['data'] = $result;


        foreach($ads['data'] as $index => $ad){
            $categories = DB::table('categorias')
                ->select('categorias.*')
                ->where('categorias.id', $ad->id)
                ->get();
            $ads['data'][$index]->categories = $categories;
        }


        return $ads;
    }




}
