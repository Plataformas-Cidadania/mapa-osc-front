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

class CommentController extends Controller{

    private $obj;
    private $module;
    private $table;


    public function __construct(){
        //$this->obj = new \App\Comment();
        $this->module = 'forms';
        $this->table = 'comments';

    }

    public function email(){
        return view($this->module.'.comment');
    }

    public function send(Request $request){

        $data = $request->all();
        $data['form']['user_id'] = 1;

        //return $data;

        DB::table('pub_comments')->insert($data);

        return $request;

//        $request = $request->all();
//        $data =  $request['form'];
//
//        Config::set('mail.host', 'in-v3.mailjet.com');
//        Config::set('mail.port', '2525');
//        //Config::set('mail.address', $settings->email);
//        //Config::set('mail.name', $settings->titulo);
//        Config::set('mail.address', 'relison@cd10.com.br');
//        Config::set('mail.name', 'Eu');
//        Config::set('mail.username', 'fd8cb8ad9fa769f7180f7ba7e5cee288');
//        Config::set('mail.password', '4139e727907608a7e113cbea20c66cee');
//        Config::set('mail.encryption', 'tls');
//
//        //verifica se o index telefone existe no array. Sen�o existir ir� criar um para evitar um erro.
//        if (!array_key_exists("cel", $data)) {
//            $data += ['cel' => ''];
//        }
//
//        //mensagem para o site///////////////////////////////////////////////////////////////////////
//        Mail::send('emails.comment.message', ['data' => $data/*, 'settings' => $settings*/], function($message) use (/*$settings,*/ $data)
//        {
//            /*$message->from($settings->email, $settings->titulo);
//            $message->sender($settings->email, $settings->titulo);
//            $message->to($settings->email, $data['name']);*/
//            $message->from('relison@cd10.com.br', 'Eu');
//            $message->sender('relison@cd10.com.br', 'Eu');
//            $message->to('relison@cd10.com.br', $data['name']);
//            //$message->bcc($address, $name = null);
//            $message->replyTo($data['email'], $data['name']);
//           //$message->subject('Contato - '.$settings->titulo);
//            $message->subject('Contato - '.'Eu');
//            //$message->priority($level);
//            //$message->attach($pathToFile, array $options = []);
//        });
//        ////////////////////////////////////////////////////////////////////////////////////////////
//
//        //resposta para o remetente/////////////////////////////////////////////////////////////////
//        Mail::send('emails.comment.response', ['data' => $data/*, 'settings' => $settings*/], function($message) use (/*$settings,*/ $data)
//        {
//            /*$message->from($settings->email, $settings->titulo);
//            $message->sender($settings->email, $settings->titulo);*/
//            $message->from('relison@cd10.com.br', 'Eu');
//            $message->sender('relison@cd10.com.br', 'Eu');
//            $message->to($data['email'], $data['name']);
//            //$message->subject('Contato - '.$settings->titulo);
//            $message->subject('Contato - '.'Eu');
//        });
//        ////////////////////////////////////////////////////////////////////////////////////////////
//
//        $retorno = ["resposta" => "enviado"];
//
//        return json_encode($retorno);
    }
}
