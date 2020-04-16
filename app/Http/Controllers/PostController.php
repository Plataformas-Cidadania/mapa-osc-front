<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Mockery\Exception;

class PostController extends Controller
{

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

        $categories = \App\PubCategory::select(
            DB::Raw("
                pub_categories.id,
                lng_pub_categories.title,
                count(pub_categories.id) as qtd
            "))
            ->join('lng_pub_categories', 'pub_categories.id', '=', 'lng_pub_categories.publish_id')
            ->join('pub_articles', 'pub_categories.id', '=', 'pub_articles.category_id')
            ->where('lng_pub_categories.title', 'ilike', $request->search.'%')
            ->groupBy('pub_categories.id', 'lng_pub_categories.title')
            ->distinct()
            ->get();

        return $categories;
    }

    public function members(Request $request){

        $members = \App\PubMember::
            select(
            DB::Raw("
                pub_members.id,
                pub_members.name,
                count(jnc_articles_members.member_id) as qtd
            ")
        )
            ->join('jnc_articles_members', 'pub_members.id', '=', 'jnc_articles_members.member_id')
            ->where('pub_members.name', 'ilike', $request->search.'%')
            ->groupBy('pub_members.id', 'pub_members.name')
            ->get();

        return $members;
    }

    public function archives(Request $request){

        $archives = DB::table('pub_articles')
            ->join('lng_pub_articles', 'pub_articles.id', '=', 'lng_pub_articles.publish_id')
            ->select(
                DB::Raw("
                to_char(pub_articles.date, 'YYYY-MM') as date_menu,
                count(date) as qtd,
                to_char(pub_articles.date, 'TMMonth') as month,
                to_char(pub_articles.date, 'YYYY') as year
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



        $total = DB::table('pub_articles')
            /*->join('articles_members', 'articles_members.member_id', '=', 'pub_members.id')
            ->join('articles_members', 'articles_members.article_id', '=', 'pub_articles.id')*/
            ->join('lng_pub_articles', 'pub_articles.id', '=', 'lng_pub_articles.publish_id')
            ->join('pub_categories', 'pub_categories.id', '=', 'pub_articles.category_id')
            ->select('pub_articles.*', 'lng_pub_articles.title', 'lng_pub_articles.description')
            ->when(count($categories) > 0, function($query) use ($categories){
                return $query->whereIn('pub_articles.category_id', $categories);
            })
            /*->when(count($members) > 0, function($query) use ($members){
                return $query->whereIn('pub_members.category_id', $members);
            })*/
            /*->when(count($archives) > 0, function($query) use ($archives){
                //return $query->whereIn('pub_articles.date', $archives);
                return $query->whereIn(DB::Raw("to_char(pub_articles.date, 'YYYY-MM')"), $archives);
            })*/
            ->get();


        $total = count($total);



        $result = DB::table('pub_articles')
            ->join('lng_pub_articles', 'pub_articles.id', '=', 'lng_pub_articles.publish_id')
            ->leftJoin('jnc_articles_members', 'pub_articles.id', '=', 'jnc_articles_members.article_id')
            ->leftJoin('pub_comments', 'pub_articles.id', '=', 'pub_comments.origin_id')
            ->select(
                DB::Raw("
                pub_articles.*,
                to_char(pub_articles.date, 'HH12:MI:SS') as hour,
                to_char(pub_articles.date, 'DD') as date,
                to_char(pub_articles.date, 'TMMonth') as month,
                to_char(pub_articles.date, 'YYYY') as year,
                pub_comments.origin_id,
                lng_pub_articles.title,
                lng_pub_articles.teaser,
                lng_pub_articles.description
                ")
            )
            ->when(count($categories) > 0, function($query) use ($categories){
                return $query->whereIn('pub_articles.category_id', $categories);
            })
            ->when(count($members) > 0, function($query) use ($members){
                return $query->whereIn('jnc_articles_members.member_id', $members);
            })
            ->when(count($archives) > 0, function($query) use ($archives){
                return $query->whereIn(DB::Raw("to_char(pub_articles.date, 'YYYY-MM')"), $archives);
            })
            ->where('lng_pub_articles.title', 'ilike', '%'.$search.'%')
            ->orderby($request->order, $request->directionOrder)
            ->distinct('pub_articles.id')
            ->take($request->qtdItemsLoad)
            ->get();

        foreach ($result as $item) {
            $item->qtd_comments = \App\PubComment::where('origin_id', $item->id)->count();
        }

        $ads['total'] = $total;
        $ads['data'] = $result;


        foreach($ads['data'] as $index => $ad){
            $categories = DB::table('pub_categories')
                ->select('pub_categories.*')
                ->where('pub_categories.id', $ad->id)
                ->get();
            $ads['data'][$index]->categories = $categories;
        }


        return $ads;
    }




}
