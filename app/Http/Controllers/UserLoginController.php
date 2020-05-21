<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserLoginController extends Controller
{
    public function index($carrinho = 0){
        return view('login', ['carrinho' => $carrinho]);
    }

    public function login(Request $request){

        Log::info($request);

        $email = $request->form['email'];
        $password = $request->form['password'];

        if (Auth::attempt(['email' => $email, 'password' => $password])) {
            //DB::table('sessions')->where('user_id', Auth::user()->id)->delete();
        }

        if (Auth::attempt(['email' => $email, 'password' => $password])) {
            return ['status' => 1];
        }

        return ['status' => 0, 'msg' => 'E-mail e/ou senha Inválido'];
    }

    public function forgetPassword(Request $request){

        $email = $request->email;

        $user = \App\User::select('name', 'email')->where('email', $email)->first();

        if(empty($user)){
            return ['invalid' => 1, 'msg' => 'Não existe cadastro com este e-mail!'];
        }

        if($this->sendEmailForgetPassword($user)){
            return ['msg' => 'Enviamos um e-mail com as instruções de redefinição de senha.'];
        }

        return ['msg' => 'Ocorreu um erro ao tentar enviar o e-mail. Tente novamente mais tarde!'];
    }

    public function sendEmailForgetPassword($user){

        $reset_token = strtolower(str_random(64));
        DB::table('password_resets')->insert([
            'email' => $user->email,
            'token' => $reset_token,
            'created_at' => Carbon::now(),
        ]);

        $sendEmail = new SendEmailController();

        return $sendEmail->forgetPassword($user, $reset_token);
    }

    public function resetPassword($token, $email){
        $reset = DB::table('password_resets')->where('token', $token)->where('email', $email)->first();

        if(empty($reset)){
            abort(404);
        }

        return view('reset-password', ['email' => $email, 'token' => $token]);
    }

    public function changeForgetPassword(Request $request){

        $data = $request->all();

        $reset = DB::table('password_resets')->where('token', $data['token'])->where('email', $data['form']['email'])->first();


        if(empty($reset)){
            return ['status' => 1, 'msg' => 'E-mail e/ou token inválido!'];
        }

        $user = \App\User::where('email', $data['form']['email']);
        $user = $user->update(['password' => bcrypt($data['form']['password'])]);

        DB::table('password_resets')->where('token', $data['token'])->where('email', $data['form']['email'])->delete();

        return ['status' => 2, 'msg' => 'Senha trocada com sucesso!'];

    }

    public function logout(){
        auth()->logout();

        return redirect('/login');
    }

}
