
{!! Form::label('titulo', 'Título *') !!}<br>
{!! Form::text('titulo', null, ['class'=>"form-control width-grande <% validar(popup.titulo) %>", 'ng-model'=>'popup.titulo', 'ng-required'=>'true', 'init-model'=>'popup.titulo', 'placeholder' => '']) !!}<br>

{!! Form::label('descricao', 'Descrição') !!}<br>
{!! Form::textarea('descricao', null, ['class'=>"form-control width-grande <% validar(popup.descricao) %>", 'ui-tinymce'=>'tinymceOptions',  'ng-model'=>'popup.descricao', 'init-model'=>'popup.descricao']) !!}<br>

{!! Form::label('url', 'Link*') !!}<br>
{!! Form::text('url', null, ['class'=>"form-control width-grande <% validar(popup.url) %>", 'ng-model'=>'popup.url', 'ng-required'=>'true',  'init-model'=>'popup.url', 'placeholder' => '']) !!}<br>

{!! Form::label('posicao', 'Posição *') !!}<br>
{!! Form::text('posicao', null, ['class'=>"form-control width-pequeno <% validar(popup.posicao) %>", 'ng-model'=>'popup.posicao', 'ng-required'=>'true', 'init-model'=>'popup.posicao', 'placeholder' => '']) !!}<br>
