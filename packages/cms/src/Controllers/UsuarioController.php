<?php

namespace Cms\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;
use Throwable;

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
            ->select($campos);

        if (!empty($request->dadoPesquisa)) {
            $usuarios->where($request->campoPesquisa, 'ilike', "%$request->dadoPesquisa%");
        }

        $usuarios = $usuarios
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

    public function excluir($id)
    {
        try {
            $usuario = DB::table('portal.tb_usuario')
                ->where('id_usuario', $id)
                ->first();

            if (!$usuario) {
                return response()->json(['message' => 'Usuário não encontrado.'], 404);
            }

            DB::transaction(function () use ($id) {
                DB::table('portal.tb_representacao')->where('id_usuario', $id)->delete();
                DB::table('portal.tb_token')->where('id_usuario', $id)->delete();
                DB::table('portal.tb_usuario')->where('id_usuario', $id)->delete();
            });

            return response()->json(['message' => 'Usuário excluído com sucesso.']);
        } catch (Throwable $e) {
            return response()->json(['message' => 'Erro ao excluir usuário.'], 500);
        }
    }
}
