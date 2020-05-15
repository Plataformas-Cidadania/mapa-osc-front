<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserAreaController extends Controller
{

    public function __construct(){
        $this->fretes = config('constants.fretes');
        $this->status = config('constants.status');
    }

    public function index(){
        return view('user-area', ['pgUserArea' => 'dashboard']);
    }

    public function documents(){
        return view('user-area', ['pgUserArea' => 'documents']);
    }
    public function document($id){
        return view('user-area', ['pgUserArea' => 'document', 'id' => $id]);
    }
    public function texts(){
        return view('user-area', ['pgUserArea' => 'texts']);
    }
    public function text($id){
        return view('user-area', ['pgUserArea' => 'text', 'id' => $id]);
    }

    public function videos(){
        return view('user-area', ['pgUserArea' => 'videos']);
    }

    /*public function video(){
        return view('user-area', ['pgUserArea' => 'video']);
    }*/

    public function data(){
        return view('user-area', ['pgUserArea' => 'data']);
    }



    public function updateData(Request $request){
        $data = $request->form;

        $data['id'] = auth()->user()->id;

        $registroCpf = \App\User::select('cpf')->where([
            ['cpf', $data['cpf']],
            ['id', '!=', $data['id']]
        ])->first();

        $registroEmail = \App\User::select('email')->where([
            ['email', $data['email']],
            ['id', '!=', $data['id']]
        ])->first();

        if($registroCpf || $registroEmail){
            return ['cpf' => $registroCpf, 'email' => $registroEmail];
        }



        $user = \App\User::find($data['id']);

        $user->update($data);

        return ['user' => $user];
    }

    public function getData(){
        return \App\User::find(auth()->user()->id);
    }



    public function listDocuments(){
        $documents = \App\Document::all();
        return $documents;
    }
    public function detailDocument($id){
        $document = \App\Document::select('id', 'title', 'arquivo', DB::Raw('min(id) as min_id', 'max(id) as max_id'))
            ->groupBy('id', 'title', 'arquivo')
            ->find($id);
        $previous_id = \App\Document::where('id', '<', $id)->max('id');
        $next_id = \App\Document::where('id', '>', $id)->min('id');
        $document->previous_id = $previous_id;
        $document->next_id = $next_id;
        return $document;
    }
    public function listTexts(){
        $texts = \App\Text::all();
        return $texts;
    }
    public function detailText($id){
        $text = \App\Text::select('id', 'title', 'description', 'imagem', DB::Raw('min(id) as min_id', 'max(id) as max_id'))
            ->groupBy('id', 'title', 'description', 'imagem')
            ->find($id);
        $previous_id = \App\Text::where('id', '<', $id)->max('id');
        $next_id = \App\Text::where('id', '>', $id)->min('id');
        $text->previous_id = $previous_id;
        $text->next_id = $next_id;
        return $text;
    }


    public  function dashboardStatus(){

        $user_id = auth()->user()->id;

        $totaisStatus = [];

        $qydStatusTotal = \App\Order::where('user_id', $user_id)->count();
        array_push($totaisStatus, ['status' => 'Todos os pedidos', 'qtdTotal' => $qydStatusTotal]);

        foreach ($this->status as $index => $value){
            $qydStatus = \App\Order::where('user_id', $user_id)->where('status', $index)->count();

            if($qydStatus>0) {
                array_push($totaisStatus, ['status' => $value, 'qtdTotal' => $qydStatus]);
            }
        }

        return $totaisStatus;

    }

}

