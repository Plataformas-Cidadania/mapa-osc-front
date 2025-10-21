<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ConselheiroController extends Controller
{
    public function index()
    {
        return view('conselheiro.index');
    }
}