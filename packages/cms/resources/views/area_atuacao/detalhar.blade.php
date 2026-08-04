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
    {!! Html::script(config('app.url').'assets-cms/js/controllers/alterarAreaAtuacaoCtrl.js') !!}
    <div ng-controller="alterarAreaAtuacaoCtrl">
        <div class="box-padrao">
            <h1><a href="{{ ($areaAtuacaoConfig['backUrl'] ?? '/cms/areas-atuacao') }}"><i class="fa fa-arrow-circle-left"></i></a>&nbsp;&nbsp;{{ $tituloAreaAtuacao ?? 'Area de atuacao' }}</h1>
            {!! Form::model($areaAtuacao, ['name' =>'form']) !!}
            <span class="texto-obrigatorio">* campos obrigatorios</span><br><br>
            @include('cms::area_atuacao._form')
            <input type="hidden" name="id" ng-model="id" ng-init="id='{{$areaAtuacao->cd_area_atuacao}}'"/>
            <div class="row">
                <div class="col-md-1 col-lg-1 col-xs-3">
                    <button class="btn btn-info" type="button" ng-click="alterar()" ng-disabled="form.$invalid && form.area_atuacao.$dirty">Salvar</button>
                </div>
                <div class="col-md-2 col-lg-2 col-xs-6">
                    <div ng-show="processandoSalvar"><i class="fa fa-spinner fa-spin"></i> Processando...</div>
                    <div><% mensagemSalvar %></div>
                </div>
                <div class="col-md-9 col-xs-3"></div>
            </div>
            <br><br><br>
            {!! Form::close()!!}
        </div>
    </div>
@endsection
