@extends('cms::layouts.app')

@section('content')
    {!! Html::script(config('app.url').'assets-cms/js/controllers/alterarTermoCtrl.js') !!}
    <div ng-controller="alterarTermoCtrl">
        <div class="box-padrao">
            <h1><a href="/cms/termos"><i class="fa fa-arrow-circle-left"></i></a>&nbsp;&nbsp;Termo</h1>
            <?php //print_r($termo);?>
            <div ng-init="carregaImagem('{{$termo->imagem}}')">
                <span class="texto-obrigatorio">* campos obrigatórios</span><br><br>
                {!! Form::model($termo, ['name' =>'form']) !!}
                <br><br>
                @include('cms::termo._form')
                <input type="hidden" name="id" ng-model="id" ng-init="id='{{$termo->id_termo}}'"/>
                <div class="row">
                    <div class="col-md-1 col-lg-1 col-xs-3">
                        <button class="btn btn-info" type="button" ng-click="alterar(picFile)" ng-disabled="form.$invalid && form.termo.$dirty">Salvar</button>
                    </div>
                    <div class="col-md-2 col-lg-2 col-xs-6">
                        <span class="progress" ng-show="picFile.progress >= 0">
                            <div style="width: <% picFile.progress %>%" ng-bind="picFile.progress + '%'"></div>
                        </span>
                        <div ng-show="processandoSalvar"><i class="fa fa-spinner fa-spin"></i> Processando...</div>
                        <div><% mensagemSalvar %></div>
                        <span ng-show="picFile.result">{{--Upload Successful--}}</span>
                        <span class="err" ng-show="errorMsg"><% errorMsg %></span>
                    </div>
                    <div class="col-md-9 col-xs-3"></div>
                </div>
                <br><br><br>




                {!! Form::close()!!}
            </div>
        </div>
    </div>
@endsection
