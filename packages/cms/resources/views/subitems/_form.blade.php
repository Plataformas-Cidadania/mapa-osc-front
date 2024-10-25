{{--É NECESSÁRIO RODAR O COMANDO composer require illuminate/html E ALTERAR ACRESCENTAR LINHA NO ARQUIVO config/app.php--}}
{!! Form::hidden('item_id', $item_id, ['ng-model'=>'subitem.item_id', 'ng-required'=>'true', 'init-model'=>'subitem.item_id', 'placeholder' => '']) !!}<br>

{!! Form::label('titulo', 'Título *') !!}<br>
{!! Form::text('titulo', null, ['class'=>"form-control width-grande <% validar(subitem.titulo) %>", 'ng-model'=>'subitem.titulo', 'ng-required'=>'true', 'init-model'=>'subitem.titulo', 'placeholder' => '']) !!}<br>

{{--
{!! Form::label('descricao', 'Descrição *') !!}<br>
{!! Form::textarea('descricao', null, ['class'=>"form-control width-grande <% validar(subitem.descricao) %>", 'ui-tinymce'=>'tinymceOptions', 'ng-model'=>'subitem.descricao', 'init-model'=>'subitem.descricao']) !!}<br>
--}}

{!! Form::label('posicao', 'Posição ') !!}<br>
{!! Form::text('posicao', null, ['class'=>"form-control width-grande <% validar(subitem.posicao) %>", 'ng-required'=>'true', 'ng-model'=>'subitem.posicao',  'init-model'=>'subitem.posicao', 'placeholder' => '']) !!}<br>

{{--
{!! Form::label('video', 'Video') !!}<br>
{!! Form::text('video', null, ['class'=>"form-control width-grande <% validar(subitem.video) %>", 'ng-model'=>'subitem.video', 'init-model'=>'subitem.video', 'placeholder' => '']) !!}<br>
--}}
{!! Form::label('url', 'Caminho') !!}<br>
{!! Form::text('url', null, ['class'=>"form-control width-grande <% validar(subitem.url) %>", 'ng-model'=>'subitem.url', 'init-model'=>'subitem.url', 'placeholder' => '']) !!}<br>



