{!! Form::label('tx_nome', 'Descrição') !!}<br>
{!! Form::textarea('tx_nome', null, ['class'=>"form-control width-grande <% validar(termo.tx_nome) %>", 'ui-tinymce'=>'tinymceOptions', 'ng-model'=>'termo.tx_nome', 'init-model'=>'termo.tx_nome']) !!}<br>
