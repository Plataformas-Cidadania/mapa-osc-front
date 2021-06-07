<div class="row" id="governanca"  data-toggle="collapse" href="#multiCollapse5" role="button" aria-expanded="false" aria-controls="multiCollapse5">
    <div class="col-md-12">
        <br><br>
        <div class="title-style">
            <h2><div class="mn-accordion-icon"><i class="fas fa-briefcase"></i></div> Relações de Trabalho e Governança</h2>
            <i class="fas fa-chevron-down float-right mn-accordion-arrow" style="margin-top: -20px" title="Fechar ou abrir grupo Relações de Trabalho e Governança"></i>
            <div class="line line-fix"></div>
            <hr/>
        </div>
    </div>
</div>
<div id="multiCollapse5" class="collapse multi-collapse show">
    <div class="row">
        <div class="col-md-6">
            <div class="bg-lgt box-itens-g min-h">
                <h2>Quadro de Dirigentes</h2>
                <?php $governancas = DB::connection('map')->table('portal.vw_osc_governanca')->where('id_osc', $id_osc)->get();?>
                @foreach($governancas as $governanca)
                    <div>
                        <p>{{$governanca->tx_cargo_dirigente}}</p>
                        <p><strong>{{$governanca->tx_nome_dirigente}}</strong></p>
                    </div>
                @endforeach
            </div>
            {{--<p>{{$relacoes_trabalho_governanca->governanca == null ? $txt_alert_abb : $relacoes_trabalho_governanca->governanca}}</p>--}}
        </div>
        <div class="col-md-6">
            <div class="bg-lgt box-itens-g min-h">
                <h2>Conselho Fiscal</h2>
                <?php $conselhos_fiscais = DB::connection('map')->table('portal.vw_osc_conselho_fiscal')->where('id_osc', $id_osc)->get();?>
                @foreach($conselhos_fiscais as $conselho_fiscal)
                    <div>
                        <p>{{$conselho_fiscal->tx_nome_conselheiro}}</p>
                    </div>
                @endforeach
            </div>
        </div>
        <div class="col-md-12">
            <div class="row text-center">
                <div class="col-md-12">
                    <br><br>
                    <strong>Trabalhadores</strong><br><br>
                </div>

                <div class="col-md-3">
                    <div class="bg-lgt box-itens">
                        <h3>Total de Trabalhadores</h3>
                        <div>
                            @if(!empty($relacoes_trabalho_governanca->nr_trabalhadores))
                                <h2>{{$relacoes_trabalho_governanca->nr_trabalhadores}}</h2>
                            @else
                                <p class='not-info'>{{$txt_alert}}</p>
                            @endif
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="bg-lgt box-itens">
                        <h3>Empregados</h3>
                        <div>
                            @if(!empty($relacoes_trabalho_governanca->nr_trabalhadores_vinculo))
                                <h2>{{$relacoes_trabalho_governanca->nr_trabalhadores_vinculo}}</h2>
                            @else
                                <p class='not-info'>{{$txt_alert}}</p>
                            @endif
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="bg-lgt box-itens">
                        <h3>Trabalhadores com deficiência</h3>
                        <div>
                            @if(!empty($relacoes_trabalho_governanca->nr_trabalhadores_deficiencia))
                                <h2>{{$relacoes_trabalho_governanca->nr_trabalhadores_deficiencia}}</h2>
                            @else
                                <p class='not-info'>{{$txt_alert}}</p>
                            @endif
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="bg-lgt box-itens">
                        <h3>Trabalhadores voluntários</h3>
                        <div>
                            @if(!empty($relacoes_trabalho_governanca->nr_trabalhadores_voluntarios))
                                <h2>{{$relacoes_trabalho_governanca->nr_trabalhadores_voluntarios}}</h2>
                            @else
                                <p class='not-info'>{{$txt_alert}}</p>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
