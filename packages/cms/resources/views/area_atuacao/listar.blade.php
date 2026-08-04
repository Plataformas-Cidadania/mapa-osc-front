@extends('cms::layouts.app')

@section('content')
    <script>
        window.areaAtuacaoConfig = {!! json_encode($areaAtuacaoConfig ?? [
            'listUrl' => 'cms/listar-areas-atuacao',
            'insertUrl' => 'cms/inserir-area-atuacao',
            'detailBaseUrl' => 'cms/area-atuacao/',
            'updateBaseUrl' => 'cms/alterar-area-atuacao/',
            'deleteBaseUrl' => 'cms/excluir-area-atuacao/',
            'backUrl' => '/cms/areas-atuacao',
        ]) !!};
    </script>
    {!! Html::script(config('app.url').'/assets-cms/js/controllers/areaAtuacaoCtrl.js') !!}
    <div ng-controller="areaAtuacaoCtrl">
        <div class="box-padrao">
            <h1><i class="fa fa-fw fa-tags"></i>&nbsp;{{ $tituloAreaAtuacao ?? 'Área de atuação' }}</h1>
            <button class="btn btn-primary" ng-click="mostrarForm=!mostrarForm" ng-show="!mostrarForm">Nova area de atuacao</button>
            <button class="btn btn-warning" ng-click="mostrarForm=!mostrarForm" ng-show="mostrarForm">Cancelar</button>
            <br><br>
            <div ng-show="mostrarForm">
                <br><br>
                @include('cms::area_atuacao._form')
                <div class="row">
                    <div class="col-md-1 col-lg-1 col-xs-3">
                        <button class="btn btn-info" type="button" ng-click="inserir()" ng-disabled="form.$invalid">Salvar</button>
                    </div>
                    <div class="col-md-2 col-lg-2 col-xs-6">
                        <div ng-show="processandoInserir"><i class="fa fa-spinner fa-spin"></i> Processando...</div>
                        <div><% mensagemInserir %></div>
                    </div>
                    <div class="col-md-9 col-xs-3"></div>
                </div>
                <br><br><br>
                {!! Form::close()!!}
            </div>
        </div>

        <br>
        <div class="row">
            <div class="col-md-12">
                <div class="box-padrao">
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-search" aria-hidden="true"></i></div>
                        <input class="form-control" type="text" ng-model="dadoAreaAtuacao" placeholder="Faca sua busca"/>
                    </div>
                    <br>
                    <div ng-show="processandoListagem"><i class="fa fa-spinner fa-spin"></i> Processando...</div>
                    <h2 class="tabela_vazia" ng-show="!processandoListagem && totalItens==0">Nenhum registro encontrado!</h2>
                    <table ng-show="totalItens>0" class="table table-striped">
                        <thead>
                        <tr>
                            <th ng-click="ordernarPor('cd_area_atuacao')" style="cursor:pointer;">
                                Id
                                <i ng-if="ordem=='cd_area_atuacao' && sentidoOrdem=='asc'" class="fa fa-angle-double-down"></i>
                                <i ng-if="ordem=='cd_area_atuacao' && sentidoOrdem=='desc'" class="fa fa-angle-double-up"></i>
                            </th>
                            <th ng-click="ordernarPor('tx_nome_area_atuacao')" style="cursor:pointer;">
                                Nome
                                <i ng-if="ordem=='tx_nome_area_atuacao' && sentidoOrdem=='asc'" class="fa fa-angle-double-down"></i>
                                <i ng-if="ordem=='tx_nome_area_atuacao' && sentidoOrdem=='desc'" class="fa fa-angle-double-up"></i>
                            </th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr ng-repeat="areaAtuacao in areasAtuacao">
                            <td><% areaAtuacao.cd_area_atuacao %></td>
                            <td><a href="<% detailBaseUrl %><% areaAtuacao.cd_area_atuacao %>"><% areaAtuacao.tx_nome_area_atuacao %></a></td>
                            <td class="text-right" style="width: 100px">
                                <div>
                                    <a href="<% detailBaseUrl %><% areaAtuacao.cd_area_atuacao %>"><i class="fa fa-edit fa-2x" title="Editar"></i></a>&nbsp;&nbsp;
                                    <a><i data-toggle="modal" data-target="#modalExcluir" class="fa fa-remove fa-2x" ng-click="perguntaExcluir(areaAtuacao.cd_area_atuacao, areaAtuacao.tx_nome_area_atuacao)"></i></a>
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
                <div ng-show="totalItens > 0" class="clan-paginacao">
                    <div class="item-paginacao">
                        <uib-pagination total-items="totalItens" ng-model="currentPage" max-size="maxSize" class="pagination-sm" boundary-links="true" force-ellipses="true" items-per-page="itensPerPage" num-pages="numPages"></uib-pagination>
                    </div>
                    <div class="item-paginacao">
                        <select class="form-control itens-por-pagina item-paginacao" ng-model="itensPerPage">
                            <option ng-selected="true">10</option>
                            <option>25</option>
                            <option>50</option>
                            <option>100</option>
                        </select>
                    </div>
                    <div class="item-paginacao">
                        <div class="resumo-pagina">&nbsp; <% primeiroDaPagina %> - <% ultimoDaPagina %> de <% totalItens %></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modalExcluir" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Excluir</h4>
                    </div>
                    <div class="modal-body">
                        <p><% tituloExcluir %></p>
                        <div ng-show="processandoExcluir"><i class="fa fa-spinner fa-spin"></i> Processando...</div>
                        <div class="mensagem-ok text-center text-danger"><% mensagemExcluido %></div>
                    </div>
                    <div class="modal-footer" ng-show="!excluido">
                        <button type="button" class="btn btn-default" ng-click="excluir(idExcluir);">Sim</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Nao</button>
                    </div>
                    <div class="modal-footer" ng-show="excluido">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
