{{--<div style="display: none;">
{!! Form::label('idioma_id', 'Idioma *') !!}<br>
{!! Form::select('idioma_id',
        $idiomas,
null, ['class'=>"form-control width-medio <% validar(chartCategoria.idioma_id) %>", 'ng-model'=>'chartCategoria.idioma_id', 'init-model'=>'chartCategoria.idioma_id']) !!}<br>
</div>--}}


{!! Form::label('titulo', 'Título *') !!}<br>
{!! Form::text('titulo', null, ['class'=>"form-control width-grande <% validar(chartCategoria.titulo) %>", 'ng-model'=>'chartCategoria.titulo', 'ng-required'=>'true', 'init-model'=>'chartCategoria.titulo', 'placeholder' => '']) !!}<br>

{!! Form::label('descricao', 'Descrição') !!}<br>
{!! Form::textarea('descricao', null, ['class'=>"form-control width-grande <% validar(chartCategoria.descricao) %>", 'ui-tinymce'=>'tinymceOptions', 'ng-model'=>'chartCategoria.descricao', 'init-model'=>'chartCategoria.descricao']) !!}<br>

{!! Form::label('posicao', 'Posição *') !!}<br>
{!! Form::text('posicao', null, ['class'=>"form-control width-pequeno <% validar(chartCategoria.posicao) %>", 'ng-model'=>'chartCategoria.posicao', 'ng-required'=>'true', 'init-model'=>'chartCategoria.posicao', 'placeholder' => '']) !!}<br>
