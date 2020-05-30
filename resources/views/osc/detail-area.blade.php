<div class="row" id="area-atuacao" data-toggle="collapse" href="#multiCollapse2" role="button" aria-expanded="false" aria-controls="multiCollapse2">
    <div class="col-md-12">
        <br><br>
        <div class="title-style">
            <h2><div class="mn-accordion-icon"><i class="fas fa-share-alt"></i></div> Áreas e Subáreas de Atuação da OSC</h2>
            <div class="line line-fix"></div>
            <hr/>
        </div>
    </div>
</div>
<div id="multiCollapse2" class="collapse multi-collapse show">
    <div class="row">
        <div class="col-md-12">
            <div class="item-detail">
                <h4>Atividade Econômica (CNAE):</h4>
                <p>{{$dados_gerais->tx_nome_atividade_economica_osc == null ? $txt_alert_abb : $dados_gerais->tx_nome_atividade_economica_osc}}</p>
            </div>
        </div>
        <div class="col-md-4">
            <div class="item-detail">
                <h4>Área de Atuação 1:</h4>
                <p>{{$area_atuacao->tx_nome_area_atuacao == null ? $txt_alert_abb : $area_atuacao->tx_nome_area_atuacao}}</p>
            </div>
        </div>
        <div class="col-md-4">
            <div class="item-detail">
                <h4>Subárea:</h4>
                <p>{{$area_atuacao->tx_nome_area_atuacao == null ? $txt_alert_abb : $area_atuacao->tx_nome_area_atuacao}}</p>
            </div>
        </div>
        <div class="col-md-4">
            <div class="item-detail">
                <h4>Subárea:</h4>
                <p>{{$area_atuacao->tx_nome_area_atuacao == null ? $txt_alert_abb : $area_atuacao->tx_nome_area_atuacao}}</p>
            </div>
        </div>
    </div>
</div>
