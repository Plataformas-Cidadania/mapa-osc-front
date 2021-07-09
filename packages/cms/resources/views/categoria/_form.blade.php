@if(!empty($midia_id))
{!! Form::hidden('midia_id', $midia_id, ['class'=>"form-control width-grande <% validar(categoria.midia_id) %>", 'ng-model'=>'categoria.midia_id', 'ng-required'=>'true', 'init-model'=>'categoria.midia_id', 'placeholder' => '']) !!}<br>
@endif
{!! Form::label('titulo', 'Título *') !!}<br>
{!! Form::text('titulo', null, ['class'=>"form-control width-grande <% validar(categoria.titulo) %>", 'ng-model'=>'categoria.titulo', 'ng-required'=>'true', 'init-model'=>'categoria.titulo', 'placeholder' => '']) !!}<br>
