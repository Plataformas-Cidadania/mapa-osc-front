@extends('layout')
@section('title', 'Identificação')
{{--@section('keywords', keywords($quem->titulo." ".$quem->descricao, 2))
@section('description', description($quem->descricao))
@section('image', "/imagens/quemsomos/md-".$quem->imagem)--}}
@section('content')

    <div class="container">
        <h1  aria-label="Identificação">Endereços de entrega</h1>
        <div class="line_title bg-pri"></div>
        <div class="row">
            <div class="col-md-3 col-md-offset-9">
                <button type="button" class="btn btn-theme btn-theme-full btn-store" data-toggle="modal" data-target="#myModal">
                    Novo endereço
                </button>
                <br>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="box-line">
                    <div class="row">
                        <div class="col-md-9">
                            <h3>Casa</h3>
                        </div>
                        <div class="col-md-3">
                            <i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>&nbsp;
                            <i class="fa fa-times fa-2x" aria-hidden="true"></i>
                        </div>
                    </div>
                    <p><strong>Cep:</strong> 24457-331</p>
                    <p><strong>Endereço:</strong> Rua Cuiabá 159</p>
                    <p><strong>Complemento:</strong></p>
                    <p><strong>Bairro:</strong> Trindade</p>
                    <p><strong>Cidade:</strong> São Gonçalo</p>
                    <p><strong>Estado:</strong> RJ</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="box-line">
                    <div class="row">
                        <div class="col-md-9">
                            <h3>Escritório</h3>
                        </div>
                        <div class="col-md-3">
                            <i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>&nbsp;
                            <i class="fa fa-times fa-2x" aria-hidden="true"></i>
                        </div>
                    </div>
                    <p><strong>Cep:</strong> 24457-331</p>
                    <p><strong>Endereço:</strong> Rua Cuiabá 159</p>
                    <p><strong>Complemento:</strong></p>
                    <p><strong>Bairro:</strong> Trindade</p>
                    <p><strong>Cidade:</strong> São Gonçalo</p>
                    <p><strong>Estado:</strong> RJ</p>
                </div>
            </div>

        </div>
        <div class="row">
            <div class="col-md-3 col-md-offset-4">
                <br><br>
                <button type="button" class="btn btn-theme btn-theme-full btn-store">
                    Prosseguir
                </button>
            </div>
        </div>
    </div>


    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Endereço casa</h4>
                </div>
                <div class="modal-body">
                    <form action="" name="frmContato">

                        <input type="hidden" name="_token" value="{{ csrf_token() }}">


                        <div class="row">
                            <div class="col-md-3">
                                <input type="email" name="email" ng-model="contato.email"  ng-required="true" class="form-control" placeholder="* CEP" ><br>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-8">
                                <input type="email" name="email" ng-model="contato.email"  ng-required="true" class="form-control" placeholder="* Endereço" ><br>
                            </div>
                            <div class="col-md-4">
                                <input type="email" name="email" ng-model="contato.email"  ng-required="true" class="form-control" placeholder="* Número" ><br>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-8">
                                <input type="email" name="email" ng-model="contato.email"  ng-required="true" class="form-control" placeholder="* Complemento" ><br>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <input type="email" name="email" ng-model="contato.email"  ng-required="true" class="form-control" placeholder="* Bairro" ><br>
                            </div>
                            <div class="col-md-4">
                                <input type="email" name="email" ng-model="contato.email"  ng-required="true" class="form-control" placeholder="* Cidade" ><br>
                            </div>
                            <div class="col-md-2">
                                <input type="email" name="email" ng-model="contato.email"  ng-required="true" class="form-control" placeholder="* Estado" ><br>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <textarea name="" ng-model="contato.mensagem" ng-required="true" cols="30" rows="5" class="form-control" placeholder="* Ponto de Referência" ></textarea>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-2 col-xs-2">
                                <button type="button" class="btn btn-primary" ng-click="inserir()" ng-disabled="frmContato.$invalid || enviandoContato">Alterar endereço</button>
                            </div>
                            <div class="col-md-10 col-xs-10">
                                <div class="text-primary" ng-show="enviandoContato" style="padding: 7px;"><i class="fa fa-spinner fa-pulse"></i> enviando e-mail</div>
                                <div ng-show="erroContato" class="text-danger" style="padding: 7px;"><i class="fa fa-exclamation-triangle"></i> Ocorreu um erro. Tente novamente!</div>
                                <div ng-show="enviadoContato" class="text-success" style="padding: 7px;"><i class="fa fa-check"></i> Enviado com sucesso!</div>
                                <div ng-show="frmContato.email.$dirty && frmContato.email.$invalid" class="text-danger">e-mail inválido</div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

@endsection

