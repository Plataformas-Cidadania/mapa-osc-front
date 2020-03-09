<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

class ContactController extends Controller{

    private $obj;
    private $module;
    private $table;


    public function __construct(){
        //$this->obj = new \App\Contact();
        $this->module = 'contact';
        $this->table = 'contacts';

    }

    public function details(){
        return view($this->module.'.contact');
    }
}
