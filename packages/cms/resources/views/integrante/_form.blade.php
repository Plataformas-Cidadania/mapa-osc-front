{!! Form::label('titulo', 'Nome *') !!}<br>
{!! Form::text('titulo', null, ['class'=>"form-control width-grande <% validar(integrante.titulo) %>", 'ng-model'=>'integrante.titulo', 'ng-required'=>'true', 'init-model'=>'integrante.titulo', 'placeholder' => '']) !!}<br>

{!! Form::label('url', 'Link *') !!}<br>
{!! Form::text('url', null, ['class'=>"form-control width-grande <% validar(integrante.url) %>", 'ng-model'=>'integrante.url',  'init-model'=>'integrante.url', 'placeholder' => '']) !!}<br>

{!! Form::label('conteudo', 'Conteúdo *') !!}<br>
{!! Form::select('conteudo',
        array(
            '0' => 'Não',
            '1' => 'Sim',
        ),
null, ['class'=>"form-control width-medio <% validar(integrante.conteudo) %>", 'ng-model'=>'integrante.conteudo', 'ng-required'=>'true', 'init-model'=>'integrante.conteudo', 'placeholder' => '']) !!}<br>
