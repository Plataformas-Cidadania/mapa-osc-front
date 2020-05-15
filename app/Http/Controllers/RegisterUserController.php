<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class RegisterUserController extends Controller
{
    public function index(Request $request){

        $carrinho = $request->carrinho;
        $email = $request->email;
        $cep = $request->cep;

        //$plan = \App\UserPlan::where([['id', $carrinho], ['status', 1]])->get();

        /*if(!count($plan)>0){
            $carrinho = 0;
        }*/

        return view('join.register', ['carrinho' => $carrinho, 'email' => $email, 'cep' => $cep]);
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

    public function register(Request $request){
        $data = $request->form;

        //Log::info($data);

        $registroCpf = \App\User::select('cpf')->where('cpf', $data['cpf'])->first();
        $registroEmail = \App\User::select('email')->where('email', $data['email'])->first();

        if($registroCpf || $registroEmail){
            return ['cpf' => $registroCpf, 'email' => $registroEmail];
        }

        $data['password'] = bcrypt($data['password']);

        $user = \App\User::create($data);

        $user_id = $user->id;

        $endereco = [
            'user_id' => $user_id,
            'nome' => 'Endereço de Cadastro',
            'cep' => $data['cep'],
            'endereco' => $data['endereco'],
            'numero' => $data['numero'],
            'complemento' => $data['complemento'],
            'bairro' => $data['bairro'],
            'cidade' => $data['cidade'],
            'estado' => $data['estado'],
            'obs' => $data['complemento'],
            'tipo' => '1',
            'principal' => '1',
        ];

        $account = \App\UserAddress::create($endereco);

        Auth::loginUsingId($user->id);

        return ['user' => $user, 'account' => $account];
    }

    public function registerAccount($carrinho){

        $user = auth()->user();

        //$account = \App\UserAccount::create(['user_id' => $user->id, 'carrinho' => $carrinho]);

        return redirect('/minha-area');
    }

    public function addresses(){

        /*$plan = DB::table('users_accounts')
            ->select('users_plans.*')
            ->join('users_plans', 'users_plans.id', '=', 'users_accounts.carrinho')
            ->where('user_id', auth()->user()->id)
            ->orderBy('users_accounts.id', 'desc')
            ->first();*/

        return view('join.register-addresses'/*, ['plan', $plan]*/);
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




}
