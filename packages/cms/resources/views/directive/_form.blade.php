{!! Form::label('type', 'Type *') !!}<br>
{!! Form::select('type',
        array(
            '1' => 'Versões da Marca',
            '2' => 'Reduções mínimas',
            '3' => 'Usando com outras marcas',
            '4' => 'Utilização em aplicações',
            '5' => 'Erros comuns'
        ),
null, ['class'=>"form-control width-medio <% validar(directive.type) %>", 'ng-model'=>'directive.type', 'ng-required'=>'true', 'init-model'=>'directive.type', 'placeholder' => '']) !!}<br>

{!! Form::label('title', 'Título *') !!}<br>
{!! Form::text('title', null, ['class'=>"form-control width-grande <% validar(directive.title) %>", 'ng-model'=>'directive.title', 'ng-required'=>'true', 'init-model'=>'directive.title', 'placeholder' => '']) !!}<br>

{!! Form::label('description', 'Descrição *') !!}<br>
{!! Form::textarea('description', null, ['class'=>"form-control width-grande <% validar(directive.description) %>", 'ui-tinymce'=>'tinymceOptions', 'ng-model'=>'directive.description', 'init-model'=>'directive.description']) !!}<br>

