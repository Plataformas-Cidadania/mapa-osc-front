<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class RegisterUserController extends Controller
{
    public function index(Request $request){

        $data = $request->form;

        $registroCpf = \App\SiteUser::select('cpf')->where('cpf', $data['cpf'])->first();
        $registroEmail = \App\SiteUser::select('email')->where('email', $data['email'])->first();

        if($registroCpf || $registroEmail){
            return ['cpf' => $registroCpf, 'email' => $registroEmail];
        }

        $data['password'] = bcrypt($data['password']);
        $user = \App\SiteUser::create($data);
        $user_id = $user->id;
        Auth::loginUsingId($user->id);

        return ['user' => $user];


        $email = $request->email;
        $name = $request->name;

        return view('join.register', ['email' => $email, 'name' => $name]);
    }
    public function representacoes(Request $request){

        return view('join.representacoes');
    }
    public function index2(){
        return view('join.register');
    }

    public function getAddress($cep){
       //Log::info($cep);
        $cep_consulta = str_replace('-', '', $cep);
        $address = file_get_contents("http://viacep.com.br/ws/$cep_consulta/json/");

        return ['address' => json_decode($address)];
    }


    public function registerAccount($carrinho){

        $user = auth()->user();

        //$account = \App\UserAccount::create(['user_id' => $user->id, 'carrinho' => $carrinho]);

        return redirect('/minha-area');
    }



    public function listAddresses(){
        $user_id = auth()->user()->id;

        $addresses = \App\UserAddress::where('user_id', $user_id)->get();

        //$maxAddresses = \App\Setting::select('max_addresses')->first()->max_addresses;
        $maxAddresses = 10;
        $qtdAddresses = count($addresses);

        if($qtdAddresses >= $maxAddresses){
            return ['max' => $maxAddresses, 'addresses' => $addresses];
        }

        return ['addresses' => $addresses, 'maxAddresses' => $maxAddresses];
    }

    public function registerAddress(Request $request){
        $data = $request->form;

        $data['user_id'] = auth()->user()->id;

        if(!array_key_exists('obs', $data)){
            $data['obs'] = "";
        }


        $user_id = auth()->user()->id;

        //Log::info($data);

        $addresses = \App\UserAddress::where('user_id', $user_id)->get();

        $maxAddresses = 3;
        $qtdAddresses = count($addresses);

        if($qtdAddresses >= $maxAddresses){
            return ['max' => $maxAddresses, 'addresses' => $addresses];
        }

        $address = \App\UserAddress::create($data);

        $userAddresses = \App\UserAddress::where('user_id', $user_id)->get();

        return ['addresses' => $userAddresses, 'maxAddresses' => $maxAddresses];
    }

    public function avisoPendenteAtivacao(){
        return view('join.aviso-pendente-ativacao');
    }

    public function usuarioAtivado(){
        return view('join.usuario-ativado');
    }

    public function ativacaoInvalida(){
        return view('join.ativacao-invalida');
    }

}
