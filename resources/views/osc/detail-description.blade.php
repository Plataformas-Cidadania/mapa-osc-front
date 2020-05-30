<div class="row" id="descricao"  data-toggle="collapse" href="#multiCollapse3" role="button" aria-expanded="false" aria-controls="multiCollapse3">
    <div class="col-md-12">
        <br><br>
        <div class="title-style">
            <h2><div class="mn-accordion-icon"><i class="fas fa-align-justify"></i></div> Descrição da OSC</h2>
            <div class="line line-fix"></div>
            <hr/>
        </div>
    </div>
</div>
<div id="multiCollapse3" class="collapse multi-collapse show">
    <div class="row">
        <div class="col-md-12">
            <div class="item-detail">
                <h4>Como surgiu a OSC:</h4>
                <p>{{$descricao->tx_historico == null ? $txt_alert_abb : $descricao->tx_historico}}</p>
            </div>
        </div>
        <div class="col-md-12">
            <div class="item-detail">
                <h4>Missão da OSC:</h4>
                <p>{{$descricao->tx_missao_osc == null ? $txt_alert_abb : $descricao->tx_missao_osc}}</p>
            </div>
        </div>
        <div class="col-md-12">
            <div class="item-detail">
                <h4>Visão da OSC:</h4>
                <p>{{$descricao->tx_visao_osc == null ? $txt_alert_abb : $descricao->tx_visao_osc}}</p>
            </div>
        </div>
        <div class="col-md-12">
            <div class="item-detail">
                <h4>Finalidades Estatutárias da OSC:</h4>
                <p>{{$descricao->tx_finalidades_estatutarias == null ? $txt_alert_abb : $descricao->tx_finalidades_estatutarias}}</p>
            </div>
        </div>
        <div class="col-md-12">
            <div class="item-detail">
                <h4>Link para o Estatuto da OSC:</h4>
                <p>
                    <a href="{{$descricao->tx_link_estatuto_osc}}" target="_blank">
                        <div class="btn btn-primary">
                            {{$descricao->tx_link_estatuto_osc == null ? $txt_alert_abb : 'Clique no link para ir ao Estatuto da OSC'}}
                        </div>
                    </a>
                </p>
            </div>
        </div>
    </div>
</div>
