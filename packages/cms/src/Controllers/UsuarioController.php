<?php

namespace Cms\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;

class UsuarioController extends Controller
{

    public function __construct()
    {
        $this->usuario = new \App\Usuario;
        $this->campos = [

        ];
    }

    function index()
    {
        $usuarios = \App\Usuario::all();
        return view('cms::usuario.listar', ['usuarios' => $usuarios]);
    }

    public function listar(Request $request)
    {
        $campos = explode(", ", $request->campos);
        $usuarios = DB::table('portal.tb_usuario')
            ->select($campos)
            ->where([
                [$request->campoPesquisa, 'ilike', "%$request->dadoPesquisa%"],
            ])
            ->orderBy($request->ordem, $request->sentido)
            ->paginate($request->itensPorPagina);
        return $usuarios;
    }

    public function detalhar($id)
    {
        $usuario = $this->usuario->where([
            ['id', '=', $id],
        ])->firstOrFail();
        return view('cms::usuario.detalhar', ['usuario' => $usuario]);
    }

    /*public function alterar(Request $request, $id)
    {

        $data = $request->all();

        $usuario = $this->usuario->where([
            ['id_usuario', '=', $id],
        ])->firstOrFail();

        $usuario->update($data['usuario']);
        return "Gravado com sucesso";
    }*/

    public function status($id)
    {
        $usuario = DB::table('portal.tb_usuario')->where('id_usuario', $id)->first();
        $ativo = !$usuario->bo_ativo;
        DB::table('portal.tb_usuario')->where('id_usuario', $id)->update(['bo_ativo' => $ativo]);
    }
}
