@extends('layout')
@section('title', 'Identificação')
{{--@section('keywords', keywords($quem->titulo." ".$quem->descricao, 2))
@section('description', description($quem->descricao))
@section('image', "/imagens/quemsomos/md-".$quem->imagem)--}}
@section('content')

    <div class="container">
        <h2  aria-label="Identificação">Identificação</h2>
        <div class="line_title bg-pri"></div>

        <div class="row">
            <br><br>

            <div class="col-md-6">
                <div class="row box-margin">
                    <h4>Já tenho cadastro</h4>
                    <form role="form" method="POST" action="{{ url("/login/$destino") }}">
                        {!! csrf_field() !!}
                        <div class="col-md-12">
                            <input type="email" name="email"  class="form-control {{ $errors->has('email') ? 'has-error' : '' }}" placeholder="E-mail"><br>
                            @if ($errors->has('email'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('email') }}</strong>
                                </span>
                            @endif
                        </div>
                        <div class="col-md-12">
                            <input type="password" name="password"  class="form-control {{ $errors->has('password') ? 'has-error' : '' }}" placeholder="Senha"><br>
                            @if ($errors->has('password'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('password') }}</strong>
                                </span>
                            @endif
                        </div>
                        <div class="col-md-4 col-xs-4">
                            <button class="btn btn-theme btn-theme-full">Continuar</button>
                        </div>
                    </form>
                    <div class="col-md-12">
                        <p class="text-right">esqueci minha senha</p>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="row box-margin">
                    <h4>&nbsp;&nbsp;Não tenho cadastro</h4>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Receba promoções e ofertas exclusivas<br>&nbsp;&nbsp;&nbsp;&nbsp;salve seus dados e facilite compras futuras</p>
                    <form name="preCadastro" action="/cadastro" method="post">
                        {{ csrf_field() }}
                        <input type="hidden" name="tipo" value="1">{{--PESSOA FÍSICA--}}
                        <div class="col-md-12">
                            <input type="email" name="email_cad"  class="form-control" placeholder="E-mail" required><br>
                        </div>
                        <div class="col-md-5 col-xs-5">
                            <button class="btn btn-theme btn-theme-full">Criar Cadastro</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>

        {{--<div class="row">
            <br><br>
            <div class="col-md-6">

                <div class="row box-margin">
                    <h4>&nbsp;&nbsp;Já tenho cadastro</h4>
                    <form action="" name="frmContato">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                            <div class="col-md-12">
                                <input type="text" ng-model="contato.nome" ng-required="true" class="form-control" placeholder="* Nome" ><br>
                            </div>
                            <div class="col-md-12">
                                <input type="email" name="email" ng-model="contato.email"  ng-required="true" class="form-control" placeholder="* E-mail" ><br>
                            </div>
                            <div class="col-md-4 col-xs-4">
                                <button type="button" class="btn btn-theme btn-theme-full" ng-click="inserir()" ng-disabled="frmContato.$invalid || enviandoContato">Continuar</button>
                            </div>
                            <div class="col-md-8 col-xs-8">
                                <div class="text-primary" ng-show="enviandoContato" style="padding: 7px;"><i class="fa fa-spinner fa-pulse"></i> enviando e-mail</div>
                                <div ng-show="erroContato" class="text-danger" style="padding: 7px;"><i class="fa fa-exclamation-triangle"></i> Ocorreu um erro. Tente novamente!</div>
                                <div ng-show="enviadoContato" class="text-success" style="padding: 7px;"><i class="fa fa-check"></i> Enviado com sucesso!</div>
                                <div ng-show="frmContato.email.$dirty && frmContato.email.$invalid" class="text-danger">e-mail inválido</div>
                            </div>
                    </form>
                    <div class="col-md-12">
                        <p class="text-right">esqueci minha senha</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6">

                <div class="row box-margin">
                    <h4>&nbsp;&nbsp;Não tenho cadastro</h4>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Receba promoções e ofertas exclusivas<br>&nbsp;&nbsp;&nbsp;&nbsp;salve seus dados e facilite compras futuras</p>
                    <form action="/cadastro" name="frmContato">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <div class="col-md-12">
                            <input type="email" name="email" ng-model="contato.email"  ng-required="true" class="form-control" placeholder="* E-mail" ><br>
                        </div>
                        <div class="col-md-5 col-xs-5">
                            <button type="submit" class="btn btn-theme btn-theme-full" ng-click="inserir()" ng-disabled="frmContato.$invalid || enviandoContato">Criar cadastro</button>
                        </div>
                        <div class="col-md-7 col-xs-7">
                            <div class="text-primary" ng-show="enviandoContato" style="padding: 7px;"><i class="fa fa-spinner fa-pulse"></i> enviando e-mail</div>
                            <div ng-show="erroContato" class="text-danger" style="padding: 7px;"><i class="fa fa-exclamation-triangle"></i> Ocorreu um erro. Tente novamente!</div>
                            <div ng-show="enviadoContato" class="text-success" style="padding: 7px;"><i class="fa fa-check"></i> Enviado com sucesso!</div>
                            <div ng-show="frmContato.email.$dirty && frmContato.email.$invalid" class="text-danger">e-mail inválido</div>
                        </div>
                    </form>
                </div>
            </div>
            <br><br>
        </div>--}}
    </div>
@endsection

