{{--É NECESSÁRIO RODAR O COMANDO composer require illuminate/html E ALTERAR ACRESCENTAR LINHA NO ARQUIVO config/app.php--}}
{!! Form::hidden('versao_id', $versao_id, ['ng-model'=>'item.versao_id', 'ng-required'=>'true', 'init-model'=>'item.versao_id', 'placeholder' => '']) !!}<br>

{!! Form::label('tipo_id', 'Tipo *') !!}<br>
{!! Form::select('tipo_id',
        array(
            '1' => 'Coordenador',
            '2' => 'Coordenador Equipe',
            '3' => 'Equipe técnica',
        ),
null, ['class'=>"form-control width-medio <% validar(item.tipo_id) %>", 'ng-model'=>'item.tipo_id', 'ng-required'=>'true', 'init-model'=>'item.tipo_id', 'placeholder' => '']) !!}<br>


{!! Form::label('integrante_id', 'Integrante') !!}<br>
{!! Form::select('integrante_id',
        $integrantes,
null, ['class'=>"form-control width-medio <% validar(item.integrante_id) %>", 'ng-model'=>'item.integrante_id', 'init-model'=>'item.integrante_id', 'placeholder' => 'Sem um Integrante']) !!}<br>

<div ng-show="item.tipo_id==1">{!! Form::label('funcao', 'Cargo') !!}<br></div>
<div ng-show="item.tipo_id==2 || item.tipo_id==3">{!! Form::label('funcao', 'Função') !!}<br></div>

<div ng-show="item.tipo_id==1 || item.tipo_id==2 || item.tipo_id==3">
    {!! Form::text('funcao', null, ['class'=>"form-control width-grande <% validar(item.funcao) %>", 'ng-model'=>'item.funcao', 'ng-required'=>'true', 'init-model'=>'item.funcao', 'placeholder' => '']) !!}<br>
</div>


{!! Form::label('instituicao', 'Instituição') !!}<br>
{!! Form::text('instituicao', null, ['class'=>"form-control width-grande <% validar(item.instituicao) %>", 'ng-model'=>'item.instituicao', 'ng-required'=>'true', 'init-model'=>'item.instituicao', 'placeholder' => '']) !!}<br>
