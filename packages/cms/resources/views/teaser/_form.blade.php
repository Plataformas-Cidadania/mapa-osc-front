{!! Form::label('titulo', 'Título *') !!}<br>
{!! Form::text('titulo', null, ['class'=>"form-control width-grande <% validar(teaser.titulo) %>", 'ng-model'=>'teaser.titulo', 'ng-required'=>'true', 'init-model'=>'teaser.titulo', 'placeholder' => '']) !!}<br>

{!! Form::label('teaser', 'Teaser ') !!}<br>
{!! Form::text('teaser', null, ['class'=>"form-control width-grande <% validar(teaser.teaser) %>", 'ng-model'=>'teaser.teaser', 'init-model'=>'teaser.teaser', 'placeholder' => '']) !!}<br>

{!! Form::label('descricao', 'Descrição') !!}<br>
{!! Form::textarea('descricao', null, ['class'=>"form-control width-grande <% validar(teaser.descricao) %>", 'ui-tinymce'=>'tinymceOptions', 'ng-model'=>'teaser.descricao', 'init-model'=>'teaser.descricao']) !!}<br>

{!! Form::label('url', 'Link ') !!}<br>
{!! Form::text('url', null, ['class'=>"form-control width-grande <% validar(teaser.url) %>", 'ng-model'=>'teaser.url', 'init-model'=>'teaser.url', 'placeholder' => '']) !!}<br>


{!! Form::label('posicao', 'Posição') !!}<br>
{!! Form::text('posicao', null, ['class'=>"form-control width-grande <% validar(teaser.posicao) %>", 'ng-model'=>'teaser.posicao', 'init-model'=>'teaser.posicao', 'placeholder' => '']) !!}<br>




