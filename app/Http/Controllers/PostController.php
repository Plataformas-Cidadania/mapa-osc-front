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

        /*$categories = \App\PubCategory::select('pub_categories.*', 'lng_pub_categories.title')
            ->join('lng_pub_categories', 'pub_categories.id', '=', 'lng_pub_categories.publish_id')
            ->where('lng_pub_categories.title', 'like', $request->search.'%')
            ->get();*/

        /*$categories = \App\PubCategory::select('pub_categories.id', 'lng_pub_categories.title')*/
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

        $members = \App\PubMember::select('*')
            ->where('name', 'ilike', $request->search.'%')
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


        /*$categories = [];
        if(array_key_exists('categories', $request->filters)){
            $categories = $request->filters['categories'];
        }*/

        /*$members = [];
        if(array_key_exists('members', $request->filters)){
            $members = $request->filters['members'];
        }*/

        /*$archives = [];
        if(array_key_exists('archives', $request->filters)){
            $archives = $request->filters['archives'];
        }*/


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
            })
            ->when(count($archives) > 0, function($query) use ($archives){
                return $query->whereIn('pub_articles.category_id', $archives);
            })*/
            ->get();

        /*$total = DB::table('accrediteds_ads')
            ->select(
                'accrediteds_ads.id', 'accrediteds_ads.title', 'accrediteds_ads.imagem',
                'accrediteds.id as accredited_id', 'accrediteds.trade',
                'accrediteds.address', 'accrediteds.number', 'accrediteds.complemento',
            )
            ->distinct()
            ->join('accrediteds', 'accrediteds.id', '=', 'accrediteds_ads.accredited_id')
            ->join('ads_categories', 'ads_categories.ad_id', '=', 'accrediteds_ads.id')
            ->where('accrediteds.city', $request->filters['city'])
            ->where('accrediteds_ads.status', 1)
            ->when(count($categories) > 0, function($query) use ($categories){
                return $query->whereIn('ads_categories.category_id', $categories);
            })
            ->orderby($request->order, $request->directionOrder)
            ->get();*/

        $total = count($total);



        $result = DB::table('pub_articles')
            ->join('lng_pub_articles', 'pub_articles.id', '=', 'lng_pub_articles.publish_id')
            /*->join('pub_categories', 'pub_categories.id', '=', 'pub_articles.category_id')*/
            ->select('pub_articles.*',
                'lng_pub_articles.title', 'lng_pub_articles.teaser', 'lng_pub_articles.description'
            )
            ->when(count($categories) > 0, function($query) use ($categories){
                return $query->whereIn('pub_articles.category_id', $categories);
            })
            ->where('lng_pub_articles.title', 'ilike', '%'.$search.'%')
            ->orderby($request->order, $request->directionOrder)
            ->get();




       /* $result = DB::table('accrediteds_ads')
            ->select(
                'accrediteds_ads.id', 'accrediteds_ads.title', 'accrediteds_ads.imagem',
                'accrediteds.id as accredited_id', 'accrediteds.trade',
                'accrediteds.address', 'accrediteds.number', 'accrediteds.complemento',
            )
            ->distinct()
            ->join('accrediteds', 'accrediteds.id', '=', 'accrediteds_ads.accredited_id')
            ->join('ads_categories', 'ads_categories.ad_id', '=', 'accrediteds_ads.id')
            ->where('accrediteds.city', $request->filters['city'])
            ->where('accrediteds_ads.status', 1)
            ->when(count($categories) > 0, function($query) use ($categories){
                return $query->whereIn('ads_categories.category_id', $categories);
            })
            ->orderby($request->order, $request->directionOrder)
            ->take($request->qtdItemsLoad)
            ->get();*/
            //->paginate();


        $ads['total'] = $total;
        $ads['data'] = $result;


        foreach($ads['data'] as $index => $ad){
            $categories = DB::table('pub_categories')
                ->select('pub_categories.*')
                ->where('pub_categories.id', $ad->id)
                ->get();
            $ads['data'][$index]->categories = $categories;
        }


        /*foreach($ads['data'] as $index => $ad){
            $categories = DB::table('categories')
                ->select('categories.*')
                ->join('ads_categories', 'ads_categories.category_id', '=', 'categories.id')
                ->where('ads_categories.ad_id', $ad->id)
                ->get();
            $ads['data'][$index]->categories = $categories;


            $off = \App\OffAd::where('ad_id', $ad->id)->orderBy('off', 'desc')->take(1)->get();
            //Log::info($off);
            if(count($off)>0){
                $ads['data'][$index]->off = $off[0]->off;
            }
        }*/

        return $ads;
    }




}
