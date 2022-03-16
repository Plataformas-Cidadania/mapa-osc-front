@extends('cms::layouts.app')

@section('content')
    {!! Html::script(config('app.url').'assets-cms/js/controllers/usuarioCtrl.js') !!}
<script>
    $(function () {
        $('[data-toggle="popover"]').popover()
    })
</script>
    <div ng-controller="usuarioCtrl">
        <div class="box-padrao">
            <h1><i class="fa fa-usuario" aria-hidden="true"></i>&nbsp;Usuarios</h1>
        </div>
        <br>
        <div class="row">
            <div class="col-md-12">
                <div class="box-padrao">
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-search" aria-hidden="true"></i></div>
                        <input class="form-control" type="text" ng-model="dadoPesquisa" placeholder="Faça sua busca"/>
                    </div>
                    <br>
                    <div><% mensagemUsuarior %></div>
                    <div ng-show="processandoListagem"><i class="fa fa-spinner fa-spin"></i> Processando...</div>
                    <h2 class="tabela_vazia" ng-show="!processandoListagem && totalItens==0">Nenhum registro encontrado!</h2>
                    <table ng-show="totalItens>0" class="table table-striped">
                        <thead>
                        <tr>
                            <th ng-click="ordernarPor('id_usuario')" style="usuarior:pointer;">
                                Id
                                <i ng-if="ordem=='id_usuario' && sentidoOrdem=='asc'" class="fa fa-angle-double-down"></i>
                                <i ng-if="ordem=='id_usuario' && sentidoOrdem=='desc'" class="fa fa-angle-double-up"></i>
                            </th>
                           {{-- <th>Imagem</th>--}}
                            <th ng-click="ordernarPor('tx_email_usuario')" style="usuarior:pointer;">
                                E-mail
                                <i ng-if="ordem=='usuario' && sentidoOrdem=='asc'" class="fa fa-angle-double-down"></i>
                                <i ng-if="ordem=='usuario' && sentidoOrdem=='desc'" class="fa fa-angle-double-up"></i>
                            </th>
                            <th ng-click="ordernarPor('tx_nome_usuario')" style="usuarior:pointer;">
                                Nome
                                <i ng-if="ordem=='usuario' && sentidoOrdem=='asc'" class="fa fa-angle-double-down"></i>
                                <i ng-if="ordem=='usuario' && sentidoOrdem=='desc'" class="fa fa-angle-double-up"></i>
                            </th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr ng-repeat="usuario in usuarios">
                            <td><% usuario.id_usuario %></td>
                            {{--<td><img ng-show="usuario.imagem" ng-src="imagens/usuarios/xs-<% usuario.imagem %>" width="60"></td>--}}
                            <td><% usuario.tx_email_usuario %></td>
                            <td><% usuario.tx_nome_usuario %></td>
                            {{--<td><a href="cms/usuario/<% usuario.id_usuario %>"><% usuario.dt_vencimento | date: 'dd/MM/yyyy' %></a></td>--}}
                            <td class="text-right">
                                <div>
                                    {{--<a href="cms/items/<% usuario.id %>"><i class="fa fa-sitemap fa-2x" title="Itens"></i></a>&nbsp;&nbsp;--}}
                                    <!--<a href="cms/usuario/<% usuario.id_usuario %>"><i class="fa fa-edit fa-2x" title="Editar"></i></a>&nbsp;&nbsp;-->
                                    <a  ng-class="<% usuario.bo_ativo %> == 1 ? 'color-success' : 'color-success-inactive'"  style="cursor: pointer;"><i class="fa fa-check-circle fa-2x" aria-hidden="true" ng-click="status(usuario.id_usuario);"></i></a>&nbsp;&nbsp;
                                    <!--<a><i data-toggle="modal" data-target="#modalExcluir" class="fa fa-remove fa-2x" ng-click="perguntaExcluir(usuario.id_usuario, usuario.tx_programa, null)"></i></a>-->
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <!--<button class="btn btn-primary btn-block" ng-click="loadMore()" ng-hide="currentPage==lastPage">Load More</button>-->
                <div ng-show="totalItens > 0" class="clan-paginacao">
                    <div class="item-paginacao">
                        <uib-pagination total-items="totalItens" ng-model="currentPage" max-size="maxSize" class="pagination-sm" boundary-links="true" force-ellipses="true" items-per-page="itensPerPage" num-pages="numPages"></uib-pagination>
                    </div>
                    <div class="item-paginacao">
                        <select class="form-control itens-por-pagina item-paginacao"  ng-model="itensPerPage">
                            <option>10</option>
                            <option>25</option>
                            <option ng-selected="true">50</option>
                            <option>100</option>
                        </select>
                    </div>
                    <div class="item-paginacao">
                        <div class="resumo-pagina">&nbsp; <% primeiroDaPagina %> - <% (ultimoDaPagina) %> de <% totalItens %></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Excluir-->
        <div class="modal fade" id="modalExcluir" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Excluir</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-3" ng-if="imagemExcluir">
                                <img  ng-src="imagens/usuarios/xs-<% imagemExcluir %>" width="100">
                            </div>
                            <div class="col-md-9">
                                <p><% tituloExcluir %></p>
                            </div>
                        </div>
                        <div ng-show="processandoExcluir"><i class="fa fa-spinner fa-spin"></i> Processando...</div>
                        <div class="mensagem-ok text-center text-danger"><% mensagemExcluido %></div>
                    </div>
                    <div id="opcoesExcluir" class="modal-footer" ng-show="!excluido">
                        <button id="btnExcluir" type="button" class="btn btn-default" ng-click="excluir(idExcluir);">Sim</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Não</button>
                    </div>
                    <div id="fecharExcluir" class="modal-footer" ng-show="excluido">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fim Modal Excluir-->
    </div>
@endsection
