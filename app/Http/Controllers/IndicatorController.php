<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

class IndicatorController extends Controller{


    public function chart(){

        $rota = Route::getCurrentRoute()->uri();





        return view('indicator.chart', [
            'rota' => $rota,
        ]);

    }
}
