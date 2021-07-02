<div class="row" id="area-atuacao" data-toggle="collapse" href="#multiCollapse2" role="button" aria-expanded="false" aria-controls="multiCollapse2">
    <div class="col-md-12">
        <br><br>
        <div class="title-style">
            <h2><div class="mn-accordion-icon"><i class="fas fa-share-alt"></i></div> Áreas e Subáreas de Atuação da OSC</h2>
            <i class="fas fa-chevron-down float-right mn-accordion-arrow" style="margin-top: -20px" title="Fechar ou abrir grupo Áreas e Subáreas de Atuação da OSC" ></i>
            <div class="line line-fix"></div>
            <hr/>
        </div>
    </div>
</div>
<div id="multiCollapse2" class="collapse multi-collapse show">
    <div class="row item-detail alert alert-secondary">

        <div class="col-md-12">
            <i class="fas fa-database float-right tx-pri"></i>
            <div class="item-detail">
                <h4>Atividade Econômica (CNAE):</h4>
                <p>{{$dados_gerais->tx_nome_classe_atividade_economica == null ? $txt_alert_abb : $dados_gerais->tx_nome_classe_atividade_economica}}</p>
            </div>
        </div>
        @foreach($area_atuacao as $area)
            <div class="col-md-6">
                <div class="item-detail">
                    <h4>Área de Atuação:</h4>
                    <p>{{$area->dc_area_atuacao->tx_nome_area_atuacao}}</p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="item-detail">
                    <h4>Subárea:</h4>
                    <p>{{$area->dc_subarea_atuacao->tx_nome_subarea_atuacao}}</p>
                </div>
            </div>
        @endforeach

    </div>
    <div>

        <div class="row">

            <?php
            $areas = [];

            foreach ($area_atuacao_rep as $item) {
                $cdObjetivo = $item->dc_area_atuacao->tx_nome_area_atuacao;
                if(array_search($cdObjetivo, array_column($areas, 'tx_nome_area_atuacao')) === false){
                    $nome_objetivo = $item->dc_subarea_atuacao->tx_nome_subarea_atuacao;
                    array_push($areas, ['tx_nome_area_atuacao' => $cdObjetivo, 'tx_nome_subarea_atuacao' => $nome_objetivo, 'subareas' => []]);
                }
                $key = array_search($cdObjetivo, array_column($areas, 'tx_nome_area_atuacao'));
                array_push($areas[$key]['subareas'], [
                    'cd_subarea_atuacao' => $item->dc_subarea_atuacao->cd_subarea_atuacao,
                    'tx_nome_subarea_atuacao' => $item->dc_subarea_atuacao->tx_nome_subarea_atuacao,
                ]);
            }

            ?>
            @foreach($areas as $area)
                <div class="col-md-3">
                    <p><strong>Área de Atuação:</strong></p>
                    <p>{{$area['tx_nome_area_atuacao']}}</p>
                    <p><strong>Subárea:</strong></p>
                    @foreach($area['subareas'] as $sub)
                        <p>{{$sub['tx_nome_subarea_atuacao']}}</p>
                    @endforeach
                    <hr>
                </div>
                <br>
            @endforeach
            <br><br>
        </div>

    </div>
</div>
