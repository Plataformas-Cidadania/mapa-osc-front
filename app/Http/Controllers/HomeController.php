<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;


class HomeController extends Controller
{
    public function index(){

        $articles = \App\PubArticle::take(3)->get();

        return view('home', ['articles' => $articles]);
    }
}


