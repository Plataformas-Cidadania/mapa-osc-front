<?php
$origin = "publicacoes";
?>
{!! Form::hidden('origin', $origin, ['ng-model'=>'categoria.origin_id', 'ng-required'=>'true', 'init-model'=>'categoria.origin_id', 'placeholder' => '']) !!}

{!! Form::label('titulo', 'Título *') !!}<br>
{!! Form::text('titulo', null, ['class'=>"form-control width-grande <% validar(categoria.titulo) %>", 'ng-model'=>'categoria.titulo', 'ng-required'=>'true', 'init-model'=>'categoria.titulo', 'placeholder' => '']) !!}<br>
