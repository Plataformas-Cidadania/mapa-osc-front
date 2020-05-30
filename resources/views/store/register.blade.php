@extends('layout')
@section('title', 'Identificação')
{{--@section('keywords', keywords($quem->titulo." ".$quem->descricao, 2))
@section('description', description($quem->descricao))
@section('image', "/imagens/quemsomos/md-".$quem->imagem)--}}
@section('content')

    <div class="container">
        <h2  aria-label="Identificação"><i class="fa fa-user-o" aria-hidden="true"></i> Identificação</h2>
        <div class="line_title bg-pri"></div>
        <p>Cadastre-se! Aproveite promoções, ofertas exclusivas</p>
        <br>


        <section>
            <form name="frmCadastro" action="/register" method="post">
                {{ csrf_field() }}
                <div class="row">
                    <div class="col-md-6">
                        <div class="col-md-12">
                            <select name="tipo" class="form-control" onChange="displayJuridica(this.value)" required>
                                <option value="" @if(empty($tipo))selected="selected"@endif>Selecione</option>
                                <option value="1" @if($tipo==1)selected="selected"@endif>Pessoa Física</option>
                                <option value="2" @if($tipo==2)selected="selected"@endif>Pessoa Jurídica</option>
                            </select><br>
                        </div>
                        {{--<div class="col-md-12 {{ $errors->has('parceiro') ? 'form-group has-error' : '' }}">
                            <input type="text" name="parceiro" class="form-control" value="{{ old('parceiro') }}" placeholder="Código do Contador"><br>
                            @if ($errors->has('parceiro'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('parceiro') }}</strong>
                                </span>
                            @endif
                        </div>--}}
                        <div id="divJuridica">
                            <div class="col-md-12 {{ $errors->has('cnpj') ? 'form-group has-error' : '' }}">
                                <input type="text" name="cnpj" class="form-control" value="{{ old('cnpj') }}" placeholder="CNPJ*"><br>
                            </div>
                            <div class="col-md-12 {{ $errors->has('razao_social') ? 'form-group has-error' : '' }}">
                                <input type="text" name="razao_social" class="form-control" value="{{ old('razao_social') }}" placeholder="Razão Social*"><br>
                            </div>
                        </div>
                        <div class="col-md-12 {{ $errors->has('name') ? 'form-group has-error' : '' }}">
                            <input type="text" name="name" class="form-control" value="{{ old('name') }}" placeholder="Nome*" ><br>
                            @if ($errors->has('name'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('name') }}</strong>
                                </span>
                            @endif
                        </div>
                        <div class="col-md-12 {{ $errors->has('nascimento') ? ' has-error' : '' }}">
                            <label for="nascimento">Nascimento*</label>
                            <input type="date" name="nascimento" class="form-control" value="{{ old('nascimento') }}" placeholder="Nascimento"><br>
                        </div>
                        <div class="col-md-12 {{ $errors->has('cpf') ? ' has-error' : '' }}">
                            <input type="text" name="cpf" class="form-control" value="{{ old('cpf') }}" placeholder="CPF*"><br>
                        </div>
                        <div class="col-md-2 {{ $errors->has('ddd_cel') ? ' has-error' : '' }}">
                            <input type="text" name="ddd_cel" class="form-control" value="{{ old('ddd_cel') }}" placeholder="DDD*"><br>
                        </div>
                        <div class="col-md-4 {{ $errors->has('celular') ? ' has-error' : '' }}">
                            <input type="text" name="celular" class="form-control" value="{{ old('celular') }}" placeholder="Celular*"><br>
                        </div>
                        <div class="col-md-2 {{ $errors->has('ddd') ? 'form-group has-error' : '' }}">
                            <input type="text" name="ddd" class="form-control" value="{{ old('ddd') }}" placeholder="DDD"><br>
                        </div>
                        <div class="col-md-4 {{ $errors->has('telefone') ? 'form-group has-error' : '' }}">
                            <input type="text" name="telefone" class="form-control" value="{{ old('telefone') }}" placeholder="Telefone"><br>
                        </div>

                    </div>

                    <div class="col-md-6">
                        <div class="col-md-12">
                            <p>Dados de acesso</p>
                        </div>
                        <div class="col-md-12 {{ $errors->has('email') ? 'form-group has-error' : '' }}">
                            <input type="email" name="email" class="form-control" value="@if(!empty(old('email'))){{ old('email') }}@else{{$email}}@endif" placeholder="Email"><br>
                            @if ($errors->has('cnpj'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('cnpj') }}</strong>
                                </span>
                            @endif
                        </div>
                        <div class="col-md-6 {{ $errors->has('password') ? 'form-group has-error' : '' }}">
                            <input type="password" name="password" class="form-control" placeholder="Senha*"><br>
                            @if ($errors->has('password'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('password') }}</strong>
                                </span>
                            @endif
                        </div>
                        <div class="col-md-6 {{ $errors->has('password_confirmation') ? 'form-group has-error' : '' }}">
                            <input type="password" name="password_confirmation" class="form-control" placeholder="Confirmar senha*"><br>
                            @if ($errors->has('password_confirmation'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('password_confirmation') }}</strong>
                                </span>
                            @endif
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="col-md-6">
                            <div class="row">
                                {{--<div class="col-md-12">
                                    <br><br>
                                    <p>Endereço de Visita</p>
                                </div>--}}
                                <div class="col-md-12 {{ $errors->has('cep') ? 'has-error' : '' }}">
                                    <div style="float:left;"><input type="text" name="cep" ng-model="cep" init-model="cep" class="form-control" value="{{ old('cep') }}" placeholder="CEP*"></div>
                                    <i class="fa fa-search" style="float:left; margin-left: 10px; margin-top:8px; cursor:pointer;" ng-click="buscaCep(cep)"></i>
                                    <div ng-show="processandoCep" style="float:left; margin-left: 10px;"><i class="fa fa-spin fa-spinner"></i> Pesquisando Cep...</div>
                                    <br>
                                </div>
                                <br><br><br>
                                <div class="col-md-12 {{ $errors->has('endereco') ? 'has-error' : '' }}">
                                    <input type="text" name="endereco"  class="form-control" value="{{ old('endereco') }}" placeholder="Endereço*"><br>
                                </div>
                                <div class="col-md-5 {{ $errors->has('numero') ? 'has-error' : '' }}">
                                    <input type="text" name="numero" class="form-control" value="{{ old('numero') }}" placeholder="Número*"><br>
                                </div>
                                <div class="col-md-7 {{ $errors->has('complemento') ? 'has-error' : '' }}">
                                    <input type="text" name="complemento" class="form-control" value="{{ old('complemento') }}" placeholder="Complemento"><br>
                                </div>
                                <div class="col-md-12 {{ $errors->has('bairro') ? 'has-error' : '' }}">
                                    <input type="text" name="bairro"  class="form-control" value="{{ old('bairro') }}" placeholder="Bairro*"><br>
                                </div>
                                <div class="col-md-12 {{ $errors->has('cidade') ? 'has-error' : '' }}">
                                    <input type="text" name="cidade"  class="form-control" value="{{ old('cidade') }}" placeholder="Cidade*"><br>
                                </div>
                                <div>
                                    <div class="col-md-2 {{ $errors->has('estado') ? 'has-error' : '' }}">
                                        <input type="text" name="estado"  class="form-control" value="{{ old('estado') }}" placeholder="Estado*"><br>
                                    </div>
                                </div>
                                <div class="col-md-12 {{ $errors->has('referencia') ? 'has-error' : '' }}">
                                    <textarea name="referencia"  cols="30" rows="5" class="form-control" placeholder="Ponto de Referência*" ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="container">
                    <div class="row">
                        <div class="col-md-12">* Campos obrigatórios</div>
                    </div>
                </div>

                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <br>
                            <button class="btn btn-primary">Enviar</button>
                        </div>
                    </div>
                </div>
            </form>
        </section>

        <script>
            displayJuridica({{$tipo}});
            function displayJuridica(type){
                if(type==1){
                    document.getElementById('divJuridica').style.display = 'none';
                }else{
                    document.getElementById('divJuridica').style.display = 'block';
                }
            }
        </script>




        {{--<div class="row">
            <br>
            <div class="col-md-12"><h4>Dados cadastrais</h4></div>
            <div class="col-md-12">

                <form action="" name="frmContato">

                    <input type="hidden" name="_token" value="{{ csrf_token() }}">

                    <div class="row">
                        <div class="col-md-12">
                            <button type="button" class="btn ">Pessoa Física</button> <button type="button" class="btn" ng-model="hideButton" ng-click="hideButton = true">Pessoa Jurídica</button><br><br>
                        </div>
                        <div class="col-md-4">
                            <input type="text" ng-model="contato.nome" ng-required="true" class="form-control" placeholder="* Nome" ><br>
                        </div>
                        <div class="col-md-4">
                            <input type="email" name="email" ng-model="contato.email"  ng-required="true" class="form-control" placeholder="* E-mail" ><br>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <input type="email" name="email" ng-model="contato.email"  ng-required="true" class="form-control" placeholder="* Senha" ><br>
                        </div>
                        <div class="col-md-3">
                            <input type="email" name="email" ng-model="contato.email"  ng-required="true" class="form-control" placeholder="* Confirmar senha" ><br>
                        </div>
                    </div>

                    <div class="row" ng-hide="hideButton!=true">
                        <% hideButton %>
                        <div class="col-md-3">
                            <input type="email" name="email" ng-model="contato.email"  ng-required="true" class="form-control" placeholder="* CNPJ" ><br>
                        </div>
                        <div class="col-md-4">
                            <input type="email" name="email" ng-model="contato.email"  ng-required="true" class="form-control" placeholder="* Razão social da empresa" ><br>
                        </div>
                        <div class="col-md-3">
                            <input type="email" name="email" ng-model="contato.email"  ng-required="true" class="form-control" placeholder="* Inscrição Estadual" ><br>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-md-3">
                            <input type="email" name="email" ng-model="contato.email"  ng-required="true" class="form-control" placeholder="* CPF" ><br>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <input type="email" name="email" ng-model="contato.email"  ng-required="true" class="form-control" placeholder="* Telefone" ><br>
                        </div>
                        <div class="col-md-3">
                            <input type="email" name="email" ng-model="contato.email"  ng-required="true" class="form-control" placeholder="* Celular" ><br>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <input type="email" name="email" ng-model="contato.email"  ng-required="true" class="form-control" placeholder="* Sexo" ><br>
                        </div>
                        <div class="col-md-3">
                            <input type="email" name="email" ng-model="contato.email"  ng-required="true" class="form-control" placeholder="* Data de nascimento" ><br>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12"><h4>Endereço de cadastro</h4></div>
                        <div class="col-md-3">
                            <input type="email" name="email" ng-model="contato.email"  ng-required="true" class="form-control" placeholder="* CEP" ><br>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <input type="email" name="email" ng-model="contato.email"  ng-required="true" class="form-control" placeholder="* Endereço" ><br>
                        </div>
                        <div class="col-md-2">
                            <input type="email" name="email" ng-model="contato.email"  ng-required="true" class="form-control" placeholder="* Número" ><br>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <input type="email" name="email" ng-model="contato.email"  ng-required="true" class="form-control" placeholder="* Complemento" ><br>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <input type="email" name="email" ng-model="contato.email"  ng-required="true" class="form-control" placeholder="* Bairro" ><br>
                        </div>
                        <div class="col-md-3">
                            <input type="email" name="email" ng-model="contato.email"  ng-required="true" class="form-control" placeholder="* Cidade" ><br>
                        </div>
                        <div class="col-md-3">
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
                            <button type="button" class="btn btn-primary" ng-click="inserir()" ng-disabled="frmContato.$invalid || enviandoContato">Enviar</button>
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

        </div>--}}
    </div>
@endsection

