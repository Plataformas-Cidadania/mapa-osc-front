@if(!empty($categoria_id))
{!! Form::hidden('categoria_id', $categoria_id, ['class'=>"form-control width-grande <% validar(post.categoria_id) %>", 'ng-model'=>'post.categoria_id', 'ng-required'=>'true', 'init-model'=>'post.categoria_id', 'placeholder' => '']) !!}<br>
@endif
<label for="data">Data</label><br>
<input type="date" name="data" class="form-control width-medio <% validar(post.data) %>" ng-model="post.data" ng-required="true" @if(!empty($post))ng-init="post.data=stringToDate('{{$post->data}}')"@endif ><br>

{!! Form::label('titulo', 'Título *') !!}<br>
{!! Form::text('titulo', null, ['class'=>"form-control width-grande <% validar(post.titulo) %>", 'ng-model'=>'post.titulo', 'ng-required'=>'true', 'init-model'=>'post.titulo', 'placeholder' => '']) !!}<br>

{!! Form::label('resumida', 'Descrição resumida *') !!}<br>
{!! Form::textarea('resumida', null, ['class'=>"form-control width-grande <% validar(post.resumida) %>", 'ng-model'=>'post.resumida', 'ng-required'=>'true',  'init-model'=>'post.resumida', 'placeholder' => '']) !!}<br>

{!! Form::label('descricao', 'Descrição *') !!}<br>
{!! Form::textarea('descricao', null, ['class'=>"form-control width-grande <% validar(post.descricao) %>", 'ui-tinymce'=>'tinymceOptions', 'ng-required'=>'true', 'ng-model'=>'post.descricao', 'init-model'=>'post.descricao']) !!}<br>


{{--@if(!empty($authors))--}}
    <p><strong>Autores</strong></p>
    @foreach($authors as $id => $integrante)
        {{$id}}
        <div class="checkbox-inline">
            {!! Form::checkbox('integrante'.$id, true, null, ['class'=>"checkbox-inline width-grande <% validar(integrante_post.integrante_$id) %>", 'ng-model'=>"integrante_post.integrante_$id", 'init-model'=>"integrante_post.integrante_$id", 'style'=>"width: 30px; height: 30px;"]) !!}
            {!! Form::label('integrante'.$id, $integrante, ['style'=>"padding: 8px 20px 0 20px;"]) !!}
        </div>
    @endforeach
    <br><br>
{{--@endif--}}

