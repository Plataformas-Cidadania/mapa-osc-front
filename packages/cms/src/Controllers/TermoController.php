<?php

namespace Cms\Controllers;

use Cms\Models\ImagemCms;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Facades\Image;

class TermoController extends Controller
{

    public function __construct()
    {
        $this->termo = new \App\Termo;
        $this->campos = [
            'tx_nome'
        ];
        $this->pathImagem = public_path().'/imagens/termos';
        $this->sizesImagem = [
            'xs' => ['width' => 360, 'height' => 130],
            'sm' => ['width' => 400, 'height' => 144],
            'md' => ['width' => 600, 'height' => 220]
        ];
        $this->widthOriginal = true;
    }

    function index()
    {

        $termos = \App\Termo::all();

        return view('cms::termo.listar', ['termos' => $termos]);
    }

    public function listar(Request $request)
    {

        //Log::info('CAMPOS: '.$request->campos);

        //Auth::loginUsingId(2);

        $campos = explode(", ", $request->campos);

        $termos = DB::table('portal.tb_termo')
            ->select($campos)
            ->where([
                [$request->campoPesquisa, 'like', "%$request->dadoPesquisa%"],
            ])
            ->orderBy($request->ordem, $request->sentido)
            ->paginate($request->itensPorPagina);

        $termos->getCollection()->transform(function ($item) {
            if (isset($item->tx_nome)) {
                $item->tx_nome = Str::limit(strip_tags($item->tx_nome), 100);
            }
            return $item;
        });

        Log::info('////////////');
        Log::info($termos);
        Log::info('////////////');

        return $termos;
    }

    public function inserir(Request $request)
    {

        $data = $request->all();

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                $data['termo'] += [$campo => ''];
            }
        }

        $file = $request->file('file');

        if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $success = $imagemCms->inserir($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal);

            if($success){
                $data['termo']['imagem'] = $filename;
                return $this->termo->create($data['termo']);
            }else{
                return "erro";
            }
        }

        return $this->termo->create($data['termo']);

    }

    public function detalhar($id)
    {
        $termo = $this->termo->where([
            ['id_termo', '=', $id],
        ])->firstOrFail();
        return view('cms::termo.detalhar', ['termo' => $termo]);
    }

    public function alterar(Request $request, $id)
    {
        $data = $request->all();

        //verifica se o index do campo existe no array e caso não exista inserir o campo com valor vazio.
        foreach($this->campos as $campo){
            if(!array_key_exists($campo, $data)){
                if($campo!='imagem'){
                    $data['termo'] += [$campo => ''];
                }
            }
        }
        $termo = $this->termo->where([
            ['id_termo', '=', $id],
        ])->firstOrFail();

        //$file = $request->file('file');

        /*if($file!=null){
            $filename = rand(1000,9999)."-".clean($file->getClientOriginalName());
            $imagemCms = new ImagemCms();
            $success = $imagemCms->alterar($file, $this->pathImagem, $filename, $this->sizesImagem, $this->widthOriginal, $termo);
            if($success){
                $data['termo']['imagem'] = $filename;
                $termo->update($data['termo']);
                return $termo->imagem;
            }else{
                return "erro";
            }
        }*/

        //remover imagem
        /*if($data['removerImagem']){
            $data['termo']['imagem'] = '';
            if(file_exists($this->pathImagem."/".$termo->imagem)) {
                unlink($this->pathImagem . "/" . $termo->imagem);
            }
        }*/

        $termo->update($data['termo']);
        return "Gravado com sucesso";
    }

    public function excluir($id)
    {
        //Auth::loginUsingId(2);

        $termo = $this->termo->where([
            ['id_termo', '=', $id],
        ])->firstOrFail();

        //remover imagens
        if(!empty($termo->imagem)){
            //remover imagens
            $imagemCms = new ImagemCms();
            $imagemCms->excluir($this->pathImagem, $this->sizesImagem, $termo);
        }


        $termo->delete();

    }

    public function positionUp($id)
    {

        $posicao_atual = DB::table('portal.tb_termo')->where('id_termo', $id)->first();
        $upPosicao = $posicao_atual->posicao-1;
        $posicao = $posicao_atual->posicao;

        //Coloca com a posicao do anterior
        DB::table('portal.tb_termo')->where('posicao', $upPosicao)->update(['posicao' => $posicao]);

        //atualiza a posicao para o anterior
        DB::table('portal.tb_termo')->where('id_termo', $id)->update(['posicao' => $upPosicao]);


    }

    public function positionDown($id)
    {

        $posicao_atual = DB::table('portal.tb_termo')->where('id_termo', $id)->first();
        $upPosicao = $posicao_atual->posicao+1;
        $posicao = $posicao_atual->posicao;

        //Coloca com a posicao do anterior
        DB::table('portal.tb_termo')->where('posicao', $upPosicao)->update(['posicao' => $posicao]);

        //atualiza a posicao para o anterior
        DB::table('portal.tb_termo')->where('id_termo', $id)->update(['posicao' => $upPosicao]);

    }




}
