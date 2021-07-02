<div class="row" id="participacao"  data-toggle="collapse" href="#multiCollapse6" role="button" aria-expanded="false" aria-controls="multiCollapse6">
    <div class="col-md-12">
        <br><br>
        <div class="title-style">
            <h2><div class="mn-accordion-icon"><i class="fas fa-users"></i></div> Espaços de Participação Social</h2>
            <i class="fas fa-chevron-down float-right mn-accordion-arrow" style="margin-top: -20px" title="Fechar ou abrir grupo Espaços de Participação Social"></i>
            <div class="line line-fix"></div>
            <hr/>
        </div>
    </div>
</div>
<div id="multiCollapse6" class="collapse multi-collapse show">
    <div class="row">
        <div class="col-md-12">
            <div class="box-itens-g">
                <h2>Conselhos de Políticas Públicas</h2>
                @foreach($participacao_social_conselhos as $participacao_social_conselho)
                    <div class="row bg-lgt">
                        <div class="col-md-12">
                            <br>
                            <p><strong>Nome do Conselho:</strong></p>
                            <p>{{$participacao_social_conselho['dc_conselho']['tx_nome_conselho']}}</p>
                        </div>
                        <div class="col-md-4 line-remove">
                            <p><strong>Periodicidade da Reunião:</strong></p>
                            <p>{{$participacao_social_conselho['dc_periodicidade_reuniao_conselho']['tx_nome_periodicidade_reuniao_conselho']}}</p>
                        </div>
                        <div class="col-md-4 line-remove">
                            <p><strong>Data de início de vigência:</strong></p>
                            <p>{{formatBr($participacao_social_conselho['dt_data_inicio_conselho'], 'num')}}</p>
                        </div>
                        <div class="col-md-4 line-remove">
                            <p><strong>Data de fim de vigência:</strong></p>
                            <p>{{formatBr($participacao_social_conselho['dt_data_fim_conselho'], 'num')}}</p>
                        </div>
                    </div>
                @endforeach
            </div>

        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="box-itens-g">
                <h2>Conferências de Políticas Públicas</h2>
                @foreach($participacao_social_conferencia as $participacao_social_conferencia)
                    <div class="row bg-lgt">
                        <div class="col-md-9">
                            <br>
                            <p><strong>Nome da Conferência:</strong></p>
                            <p>{{$participacao_social_conferencia['dc_conferencia']['tx_nome_conferencia']}}</p>
                        </div>
                        <div class="col-md-3">
                            <br class="d-none d-sm-block">
                            <p><strong>Ano de realização da conferência:</strong></p>
                            <p>{{formatBr($participacao_social_conferencia['dt_ano_realizacao'], 'num')}}</p>
                        </div>
                        <div class="col-md-12">
                            <p><strong>Forma de participação na conferência:</strong></p>
                            <p>{{$participacao_social_conferencia['dc_forma_participacao_conferencia']['tx_nome_forma_participacao_conferencia']}}</p>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="box-itens-g">
                <h2>Outros espaços de participação social</h2>
                @foreach($participacao_social_outros as $participacao_social_outros)
                    <div class="row bg-lgt">
                        <div class="col-md-9">
                            <br>
                            <p><strong>Atuação em Fóruns, Articulações, Coletivos e Redes de OSCs:</strong></p>
                            <p>{{$participacao_social_outros['tx_nome_participacao_social_outra']}}</p>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</div>
