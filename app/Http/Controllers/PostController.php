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

    public function offers(Request $request){

        $offers = \App\OffAd::select('off')->distinct()->orderBy('off')->get();

        return $offers;
    }

    public function districts(Request $request){

        $districts = \App\District::select('id', 'title')->where('title', 'like', $request->search.'%')->get();


        return $districts;
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

        $districts = [];
        if(array_key_exists('districts', $request->filters)){
            $districts = $request->filters['districts'];
        }

        $offers = [];
        if(array_key_exists('offers', $request->filters)){
            $offers = $request->filters['offers'];
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
                'accrediteds.district', 'accrediteds.city', 'accrediteds.state'
            )
            ->distinct()
            ->join('accrediteds', 'accrediteds.id', '=', 'accrediteds_ads.accredited_id')
            ->join('ads_days', 'ads_days.ad_id', '=', 'accrediteds_ads.id')
            ->join('ads_offers', 'ads_offers.ad_id', '=', 'accrediteds_ads.id')
            ->join('ads_categories', 'ads_categories.ad_id', '=', 'accrediteds_ads.id')
            ->where('accrediteds.city', $request->filters['city'])
            ->where('accrediteds_ads.status', 1)
            ->whereIn('ads_days.day', $days)
            ->when(count($categories) > 0, function($query) use ($categories){
                return $query->whereIn('ads_categories.category_id', $categories);
            })
            ->when(count($districts) > 0, function($query) use ($districts){
                return $query->whereIn('accrediteds.district', $districts);
            })
            ->when(count($offers) > 0, function($query) use ($offers){
                return $query->whereIn('ads_offers.off', $offers);
            })
            ->orderby($request->order, $request->directionOrder)
            ->get();*/

        $total = count($total);


        Log::info($categories);
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

        Log::info($result);


       /* $result = DB::table('accrediteds_ads')
            ->select(
                'accrediteds_ads.id', 'accrediteds_ads.title', 'accrediteds_ads.imagem',
                'accrediteds.id as accredited_id', 'accrediteds.trade',
                'accrediteds.address', 'accrediteds.number', 'accrediteds.complemento',
                'accrediteds.district', 'accrediteds.city', 'accrediteds.state'
            )
            ->distinct()
            ->join('accrediteds', 'accrediteds.id', '=', 'accrediteds_ads.accredited_id')
            ->join('ads_days', 'ads_days.ad_id', '=', 'accrediteds_ads.id')
            ->join('ads_offers', 'ads_offers.ad_id', '=', 'accrediteds_ads.id')
            ->join('ads_categories', 'ads_categories.ad_id', '=', 'accrediteds_ads.id')
            ->where('accrediteds.city', $request->filters['city'])
            ->where('accrediteds_ads.status', 1)
            ->whereIn('ads_days.day', $days)
            ->when(count($categories) > 0, function($query) use ($categories){
                return $query->whereIn('ads_categories.category_id', $categories);
            })
            ->when(count($districts) > 0, function($query) use ($districts){
                return $query->whereIn('accrediteds.district', $districts);
            })
            ->when(count($offers) > 0, function($query) use ($offers){
                return $query->whereIn('ads_offers.off', $offers);
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

    public function getAd($id){
        $ad = \App\AccreditedAd::
            join('accrediteds', 'accrediteds.id', 'accrediteds_ads.accredited_id')
            ->where('accrediteds_ads.id', $id)
            ->where('accrediteds_ads.status', 1)
            ->first();


        $address = str_replace(' ', '+', $ad->address).'+'.$ad->number;
        $district = str_replace(' ', '+', $ad->district);
        $city = str_replace(' ', '+', $ad->city);
        $state = str_replace(' ', '+', $ad->state);


        //Log::info($address);

        $query = "street=$address+&district=$district+&city=$city+&state=$state";
        $url = "http://nominatim.openstreetmap.org/search.php?email=....&$query&format=json";

        $cacheKey = 'get_lat-lon-'.$query;



        $openstreetmap = '';
        try{
            $openstreetmap = file_get_contents($url);
        }catch (\Exception $e){
            Log::info($e);
        }

        $openstreetmap = json_decode($openstreetmap);

        $lat_lon = ['lat' => 0, 'lon' => 0];
        if(count($openstreetmap) > 0){
            $lat_lon = ['lat' => $openstreetmap[0]->lat, 'lon' => $openstreetmap[0]->lon];
        }

        $offers = \App\OffAd::where('ad_id', $id)->get();

        $links = \App\LinkAd::where('ad_id', $id)->get();

        $days = \App\DayAd::where('ad_id', $id)->get();


        return ['ad' => $ad, 'offers' => $offers, 'days' => $days, 'lat_lon' => $lat_lon, 'links' => $links];
    }


}
