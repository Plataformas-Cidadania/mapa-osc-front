<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ConselhoController extends Controller
{
    public function dashboard()
    {
        return view('conselho.dashboard');
    }

    public function index()
    {
        return view('conselho.index');
    }
}