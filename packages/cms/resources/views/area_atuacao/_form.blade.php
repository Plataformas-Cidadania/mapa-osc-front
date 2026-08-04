{!! Form::label('tx_nome_area_atuacao', 'Nome da area de atuacao') !!}<br>
{!! Form::text('tx_nome_area_atuacao', null, ['class'=>"form-control width-grande <% validar(area_atuacao.tx_nome_area_atuacao) %>", 'ng-model'=>'area_atuacao.tx_nome_area_atuacao']) !!}<br>
