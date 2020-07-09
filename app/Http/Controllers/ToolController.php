<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

class ToolController extends Controller{

    public function seal(){
        /*$text = \App\Text::where('slug', 'contato')->first();*/
        return view('tool.seal'/*, [
            'text' => $text,
        ]*/);
    }


}
