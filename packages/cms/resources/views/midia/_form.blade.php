{!! Form::label('titulo', 'Título *') !!}<br>
{!! Form::text('titulo', null, ['class'=>"form-control width-grande <% validar(midia.titulo) %>", 'ng-model'=>'midia.titulo', 'ng-required'=>'true', 'init-model'=>'midia.titulo', 'placeholder' => '']) !!}<br>
