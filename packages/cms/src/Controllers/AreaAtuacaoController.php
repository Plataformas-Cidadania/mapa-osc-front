<?php

namespace Cms\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AreaAtuacaoController extends Controller
{
    public function __construct()
    {
        $this->areaAtuacao = new \App\CmsAreaAtuacao;
        $this->campos = [
            'tx_nome_area_atuacao',
        ];
    }

    public function index()
    {
        $areasAtuacao = \App\CmsAreaAtuacao::orderBy('cd_area_atuacao')->get();

        return view('cms::area_atuacao.listar', [
            'areasAtuacao' => $areasAtuacao,
            'tituloAreaAtuacao' => 'Area de atuacao',
        ]);
    }

    public function listar(Request $request)
    {
        $campos = explode(', ', $request->campos);

        return DB::connection('map')
            ->table('syst.dc_area_atuacao')
            ->select($campos)
            ->where($request->campoPesquisa, 'like', "%$request->dadoPesquisa%")
            ->orderBy($request->ordem, $request->sentido)
            ->paginate($request->itensPorPagina);
    }

    public function inserir(Request $request)
    {
        $data = $request->all();
        $data['area_atuacao'] = $data['area_atuacao'] ?? [];

        foreach ($this->campos as $campo) {
            if (!array_key_exists($campo, $data['area_atuacao'])) {
                $data['area_atuacao'][$campo] = '';
            }
        }

        return $this->areaAtuacao->create($data['area_atuacao']);
    }

    public function detalhar($id)
    {
        $areaAtuacao = $this->areaAtuacao->where('cd_area_atuacao', $id)->firstOrFail();

        return view('cms::area_atuacao.detalhar', [
            'areaAtuacao' => $areaAtuacao,
            'tituloAreaAtuacao' => 'Area de atuacao',
        ]);
    }

    public function alterar(Request $request, $id)
    {
        $data = $request->all();
        $data['area_atuacao'] = $data['area_atuacao'] ?? [];

        foreach ($this->campos as $campo) {
            if (!array_key_exists($campo, $data['area_atuacao'])) {
                $data['area_atuacao'][$campo] = '';
            }
        }

        $areaAtuacao = $this->areaAtuacao->where('cd_area_atuacao', $id)->firstOrFail();
        $areaAtuacao->update($data['area_atuacao']);

        return 'Gravado com sucesso';
    }

    public function excluir($id)
    {
        $areaAtuacao = $this->areaAtuacao->where('cd_area_atuacao', $id)->firstOrFail();
        $areaAtuacao->delete();
    }
}
