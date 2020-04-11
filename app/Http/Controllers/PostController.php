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

        $categories = \App\PubCategory::select('pub_categories.*', 'lng_pub_categories.title')
            ->join('lng_pub_categories', 'pub_categories.id', '=', 'lng_pub_categories.publish_id')
            ->where('lng_pub_categories.title', 'like', $request->search.'%')
            ->get();

        return $categories;
    }

    public function members(Request $request){

        $members = \App\PubMember::select('*')
            ->where('name', 'like', $request->search.'%')
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
            /*->when(count($categories) > 0, function($query) use ($categories){
                return $query->whereIn('pub_articles.category_id', $categories);
            })*/
            ->groupBy('date_menu', 'month', 'year')
            ->orderby('date_menu')
            ->distinct('date_menu')
            ->get();

        return $archives;
    }

    public function getList(Request $request){

        $days = $request->filters['days'];

        $categories = [];
        if(array_key_exists('categories', $request->filters)){
            $categories = $request->filters['categories'];
        }

        $members = [];
        if(array_key_exists('members', $request->filters)){
            $members = $request->filters['members'];
        }


        $total = DB::table('pub_articles')
            ->join('lng_pub_articles', 'pub_articles.id', '=', 'lng_pub_articles.publish_id')
            ->join('pub_categories', 'pub_categories.id', '=', 'pub_articles.category_id')
            ->select('pub_articles.*', 'lng_pub_articles.title', 'lng_pub_articles.description')
            ->when(count($categories) > 0, function($query) use ($categories){
                return $query->whereIn('pub_articles.category_id', $categories);
            })
            ->get();

        /*$total = DB::table('accrediteds_ads')
            ->select(
                'accrediteds_ads.id', 'accrediteds_ads.title', 'accrediteds_ads.imagem',
                'accrediteds.id as accredited_id', 'accrediteds.trade',
                'accrediteds.address', 'accrediteds.number', 'accrediteds.complemento',
            )
            ->distinct()
            ->join('accrediteds', 'accrediteds.id', '=', 'accrediteds_ads.accredited_id')
            ->join('ads_days', 'ads_days.ad_id', '=', 'accrediteds_ads.id')
            ->join('ads_categories', 'ads_categories.ad_id', '=', 'accrediteds_ads.id')
            ->where('accrediteds.city', $request->filters['city'])
            ->where('accrediteds_ads.status', 1)
            ->whereIn('ads_days.day', $days)
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
                Log::info('1111');
                return $query->whereIn('pub_articles.category_id', $categories);
            })
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
            ->join('ads_days', 'ads_days.ad_id', '=', 'accrediteds_ads.id')
            ->join('ads_categories', 'ads_categories.ad_id', '=', 'accrediteds_ads.id')
            ->where('accrediteds.city', $request->filters['city'])
            ->where('accrediteds_ads.status', 1)
            ->whereIn('ads_days.day', $days)
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

            $days = \App\DayAd::where('ad_id', $ad->id)->get();
            $ads['data'][$index]->days = $days;

            $off = \App\OffAd::where('ad_id', $ad->id)->orderBy('off', 'desc')->take(1)->get();
            //Log::info($off);
            if(count($off)>0){
                $ads['data'][$index]->off = $off[0]->off;
            }
        }*/

        return $ads;
    }




}
