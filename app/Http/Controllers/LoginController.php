<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

class LoginController extends Controller
{
    public function index($destino){
        /*$carts = DB::table('carts')->paginate(10);*/

        if(Auth::check()){
            return redirect('/'.$destino);
        }

        return view('store.login', ['destino' => $destino]);
    }

    public function login(Request $request, $destino)
    {
        //dd($request->all());

        $validator = validator($request->all(), [
            'email' => 'required|min:3|max:100',
            'password' => 'required|min:3|max:100',
        ]);

        if($validator->fails()){
            return redirect("/login/$destino")
                ->withErrors($validator)
                ->withInput();
        }

        $dadosUsuario = ['email' => $request->get('email'), 'password' => $request->get('password')];

        if(auth()->attempt($dadosUsuario)){
            return redirect("/$destino");
        }else{
            return redirect('/login')
                ->withErrors(['errors'=>'Usuário ou senha inválidos'])
                ->withInput();
        }
    }

    public function logout(){
        auth()->logout();
        return redirect('/');

    }
}
