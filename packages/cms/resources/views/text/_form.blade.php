{!! Form::label('titulo', 'Título *') !!}<br>
{!! Form::text('titulo', null, ['class'=>"form-control width-grande <% validar(text.titulo) %>", 'ng-model'=>'text.titulo', 'ng-required'=>'true', 'init-model'=>'text.titulo', 'placeholder' => '']) !!}<br>

{!! Form::label('descricao', 'Descrição') !!}<br>
{!! Form::textarea('descricao', null, ['class'=>"form-control width-grande <% validar(text.descricao) %>", 'ui-tinymce'=>'tinymceOptions', 'ng-model'=>'text.descricao', 'init-model'=>'text.descricao']) !!}<br>

{!! Form::label('slug', 'Slug ') !!}<br>
{!! Form::text('slug', null, ['class'=>"form-control width-grande <% validar(text.slug) %>", 'ng-model'=>'text.slug', 'init-model'=>'text.slug', 'placeholder' => '']) !!}<br>




