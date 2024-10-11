@if(!empty($chart_categoria_id))
{!! Form::hidden('chart_categoria_id', $chart_categoria_id, ['class'=>"form-control width-grande <% validar(chart.chart_categoria_id) %>", 'ng-model'=>'chart.chart_categoria_id', 'ng-required'=>'true', 'init-model'=>'chart.chart_categoria_id', 'placeholder' => '']) !!}<br>
@endif
{!! Form::label('titulo', 'Título *') !!}<br>
{!! Form::text('titulo', null, ['class'=>"form-control width-grande <% validar(chart.titulo) %>", 'ng-model'=>'chart.titulo', 'ng-required'=>'true', 'init-model'=>'chart.titulo', 'placeholder' => '']) !!}<br>

{!! Form::label('descricao', 'Descrição') !!}<br>
{!! Form::textarea('descricao', null, ['class'=>"form-control width-grande <% validar(chart.descricao) %>", 'ui-tinymce'=>'tinymceOptions', 'ng-model'=>'chart.descricao', 'init-model'=>'chart.descricao']) !!}<br>


{!! Form::label('fonte', 'Fonte') !!}<br>
{!! Form::text('fonte', null, ['class'=>"form-control width-grande <% validar(chart.fonte) %>", 'ng-model'=>'chart.fonte', 'ng-required'=>'false', 'init-model'=>'chart.fonte', 'placeholder' => '']) !!}<br>

{!! Form::label('tipo', 'Tipo') !!}<br>
{!! Form::text('tipo', null, ['class'=>"form-control width-grande <% validar(chart.tipo) %>", 'ng-model'=>'chart.tipo', 'ng-required'=>'false', 'init-model'=>'chart.tipo', 'placeholder' => '']) !!}<br>

{!! Form::label('slug', 'Slug') !!}<br>
{!! Form::text('slug', null, ['class'=>"form-control width-grande <% validar(chart.slug) %>", 'ng-model'=>'chart.slug', 'ng-required'=>'false', 'init-model'=>'chart.slug', 'placeholder' => '']) !!}<br>

{!! Form::label('tipo_nome', 'Nome') !!}<br>
{!! Form::text('tipo_nome', null, ['class'=>"form-control width-grande <% validar(chart.tipo_nome) %>", 'ng-model'=>'chart.tipo_nome', 'ng-required'=>'false', 'init-model'=>'chart.tipo_nome', 'placeholder' => '']) !!}<br>

{!! Form::label('formato', 'Formatação') !!}<br>
{!! Form::text('formato', null, ['class'=>"form-control width-grande <% validar(chart.formato) %>", 'ng-model'=>'chart.formato', 'ng-required'=>'false', 'init-model'=>'chart.formato', 'placeholder' => '']) !!}<br>
