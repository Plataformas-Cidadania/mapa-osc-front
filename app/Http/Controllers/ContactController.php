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

class ContactController extends Controller{

    private $module;
    private $table;


    public function __construct(){
        $this->module = 'forms';
        $this->table = 'contacts';
    }

    public function email(){
        $text = \App\Text::where('slug', 'contato')->first();
        $expediente = \App\Text::where('slug', 'contato-expediente')->first();
        $setting = \App\Setting::first();

        if(!empty($text) && !empty($expediente)){
            return view($this->module.'.contact', ['text' => $text, 'expediente' => $expediente, 'setting' => $setting]);
        }

        return "<div style='color: #721c24; background-color: #f8d7da; border-color: #f5c6cb; padding: 10px; border-radius: 5px; text-align: center;'>
                    Ops! Cadastre no CMS em texts o slug
                    <strong>contato</strong> e <strong>contato-expediente</strong>
                </div>";

    }

    public function send(Request $request){
        $settings = \App\Setting::first();

        //Log::info($settings);

        $request = $request->all();
        $data =  $request['form'];

        Config::set('mail.host', env('MAIL_HOST'));
        Config::set('mail.port', env('MAIL_PORT'));
        Config::set('mail.address', $settings->email);
        Config::set('mail.name', $settings->titulo);
        Config::set('mail.username', env('MAIL_USERNAME'));
        Config::set('mail.password', env('MAIL_PASSWORD'));
        //Config::set('mail.encryption', env('MAIL_ENCRYPTION'));

        //verifica se o index telefone existe no array. Se nao existir ira criar um para evitar um erro.
        if (!array_key_exists("cel", $data)) {
            $data += ['cel' => ''];
        }

        //mensagem para o site///////////////////////////////////////////////////////////////////////
        Mail::send('emails.contact.message', ['data' => $data, 'settings' => $settings], function($message) use ($settings, $data)
        {
            $message->from($settings->email, $settings->titulo);
            $message->sender($settings->email, $settings->titulo);
            $message->to($settings->email, $data['name']);
            $message->replyTo($data['email'], $data['name']);
            $message->subject('Contato - '.$settings->titulo);

            //$message->priority($level);
            //$message->attach($pathToFile, array $options = []);
        });
        ////////////////////////////////////////////////////////////////////////////////////////////

        //resposta para o remetente/////////////////////////////////////////////////////////////////
        Mail::send('emails.contact.response', ['data' => $data, 'settings' => $settings], function($message) use ($settings, $data)
        {
            $message->from($settings->email, $settings->titulo);
            $message->sender($settings->email, $settings->titulo);
            $message->to($data['email'], $data['name']);
            $message->subject('Contato - '.$settings->titulo);
        });
        ////////////////////////////////////////////////////////////////////////////////////////////

        $retorno = ["resposta" => "enviado"];

        return json_encode($retorno);
    }
}
