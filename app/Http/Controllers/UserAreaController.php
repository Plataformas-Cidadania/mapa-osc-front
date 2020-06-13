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
    public function oscs(){
        return view('user-area', ['pgUserArea' => 'oscs']);
    }
    public function osc($id){
        return view('user-area', ['pgUserArea' => 'osc', 'id' => $id]);
    }
    public function data(){
        return view('user-area', ['pgUserArea' => 'data']);
    }

    public function certificates(){
        return view('user-area', ['pgUserArea' => 'certificates']);
    }
    public function governancas(){
        return view('user-area', ['pgUserArea' => 'governancas']);
    }



    public function documents(){
        return view('user-area', ['pgUserArea' => 'documents']);
    }
    public function document($id){
        return view('user-area', ['pgUserArea' => 'document', 'id' => $id]);
    }


    public function videos(){
        return view('user-area', ['pgUserArea' => 'videos']);
    }

    /*public function video(){
        return view('user-area', ['pgUserArea' => 'video']);
    }*/



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

    public function getOsc(){

        /*$osc = DB::connection('map')
            ->table('osc.tb_dados_gerais')
            ->select(
                'id_osc', 'tx_razao_social_osc', 'tx_sigla_osc', 'cd_situacao_imovel_osc', 'tx_nome_responsavel_legal'
            )
            ->where('id_osc', $id)
            ->first();*/

        $id = 508303;
        $osc = DB::connection('map')
            ->table('osc.tb_dados_gerais')
            ->select('id_osc', 'tx_razao_social_osc', 'tx_sigla_osc', 'cd_situacao_imovel_osc', 'tx_nome_responsavel_legal')
            ->where('id_osc', $id)
            ->first();

        $localizacao = DB::connection('map')
            ->table('osc.tb_localizacao')
            ->select('tx_endereco', 'nr_localizacao', 'tx_bairro', 'cd_municipio', 'nr_cep', 'cd_municipio')
            ->where('id_osc', $id)
            ->first();

        return [
            'osc' => $osc,
            'localizacao' => $localizacao
        ];
    }

    public function updateOsc(Request $request){
        $data = $request->form;

        //$data['id'] = auth()->user()->id;

        $id = 508303;

        /*$registroCpf = \App\SiteUser::select('cpf')->where([
            ['cpf', $data['cpf']],
            ['id', '!=', $data['id']]
        ])->first();

        $registroEmail = \App\SiteUser::select('email')->where([
            ['email', $data['email']],
            ['id', '!=', $data['id']]
        ])->first();

        if($registroCpf || $registroEmail){
            return ['cpf' => $registroCpf, 'email' => $registroEmail];
        }*/

        $osc = \App\OscDadoGeral::
            select(
                'id_osc', 'tx_razao_social_osc', 'tx_sigla_osc'
            )
            ->where('id_osc', $id)
            ->orderBy('id_osc')
            ->update($data);

        /*$osc = DB::connection('map')
            ->table('osc.tb_dados_gerais')
            ->select(
                'id_osc', 'tx_razao_social_osc', 'tx_sigla_osc', 'cd_situacao_imovel_osc', 'tx_nome_responsavel_legal'
           )
            ->where('id_osc', $id)
            ->orderBy('id_osc')
            ->update($data);*/


        return ['user' => $osc];
    }

    public function getData(){
        return \App\SiteUser::find(auth()->user()->id);
    }




    public function listOscs(){
        //$oscs = \App\Osc::all();
        $oscs = DB::connection('map')
            ->table('osc.vw_busca_osc')
            ->select('id_osc', 'tx_nome_osc')
            ->where('id_osc', 789809)
            ->get();
        return $oscs;
    }

    public function listDocuments(){
        $documents = \App\Document::all();
        return $documents;
    }

    /////////////////////////////////////
    public function listCertificates(){
        $id = 455128;
        $certificates = \App\UserCertificate::where('id_osc', $id)->get();
        //$certificates = \App\UserCertificate::where('id_osc', auth()->user()->id)->get();
        return $certificates;
    }
    public function editCertificate($id){
        $id = 455128;
        $certificate = \App\UserCertificate::where([
            'id_osc', $id
            /*['user_id', auth()->user()->id],
            ['id', $id],*/
        ])->first();
        return $certificate;
    }
    public function updateCertificate(Request $request){
        $certificate = \App\UserCertificate::find($request->id);
        $certificate->update($request->form);
        return $certificate;
    }
    //////////////////////////////////////
    /////////////////////////////////////
    public function listGovernancas(){
        $id = 455128;
        $governancas = \App\UserGovernanca::where('id_osc', $id)->get();
        //$certificates = \App\UserCertificate::where('id_osc', auth()->user()->id)->get();
        return $governancas;
    }
    public function editGovernancas($id){
        $id = 455128;
        $governanca = \App\UserGovernanca::where([
            'id_osc', $id
            /*['user_id', auth()->user()->id],
            ['id', $id],*/
        ])->first();
        return $governanca;
    }
    public function updateGovernancas(Request $request){
        $governanca = \App\UserGovernanca::find($request->id);
        $governanca->update($request->form);
        return $governanca;
    }
    public function removeGovernanca($id){
        $governanca = \App\UserGovernanca::where([
            /*['user_id', auth()->user()->id],*/
            ['id_dirigente', $id],
        ])->first();

        $governanca->delete();
    }
    public function listConselhos(){
        $id = 455128;
        $conselhos = \App\UserConselho::where('id_osc', $id)->get();
        return $conselhos;
    }
    ///////////////////////////////////



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

