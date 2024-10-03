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
        <div class="col">
            <div class="bg-lgt box-itens-g min-h">
                <h2>Quadro de dirigentes</h2>
                @foreach($governancas as $governanca)
                    <div>
                        <?php echo iconType($governanca['ft_nome_dirigente']); ?>
                        <p>{{$governanca['tx_cargo_dirigente']}}</p>
                        <p><strong>{{$governanca['tx_nome_dirigente']}}</strong></p>
                    </div>
                @endforeach
            </div>
        </div>
        <div class="col">
            <div class="bg-lgt box-itens-g min-h">
                <h2>Conselho fiscal</h2>
                @foreach($conselhos_fiscais as $conselho_fiscal)
                    <div>
                        <?php echo iconType($conselho_fiscal['ft_nome_conselheiro']); ?>
                        <p>{{$conselho_fiscal['tx_nome_conselheiro']}}</p>
                    </div>
                @endforeach
            </div>
        </div>
            <div class="col-md-4">
                <div class="bg-lgt box-itens-g min-h">
                    <h2>Quadro societário</h2>
                    @if(isset($quadros_societarios['Resposta']))
                        {{$quadros_societarios['Resposta']}}
                    @else
                        @foreach($quadros_societarios as $quadro_societario)
                            <div>
                                    <?php echo iconType($quadro_societario['ft_nome_socio']); ?>
                                <p>{{$quadro_societario['tx_nome_socio']}}</p>
                                {{--<p><strong>CPF: </strong>{{$quadro_societario['tx_cpf_socio']}}</p>--}}
                                <p><strong>Data entrada:</strong> {{ \Carbon\Carbon::parse($quadro_societario['tx_data_entrada_socio'])->format('d/m/Y') }}</p>
                                <p><strong>Tipo sócio: </strong>{{$quadro_societario['tipo_socio']['tx_tipo_socio']}}</p>
                                <p><strong>Qualificação: </strong>{{$quadro_societario['qualificacao_socio']['tx_qualificacao_socio']}}</p>
                            </div>
                        @endforeach

                    @endif
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

                            <?php //print_r($relacoes_trabalho_governanca)//echo iconType($relacoes_trabalho_governanca['ft_trabalhadores']); ?>
                            @if(!empty($relacoes_trabalho_governanca['nr_trabalhadores']))
                                <h2>{{$relacoes_trabalho_governanca['nr_trabalhadores']}}</h2>
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
                            <?php echo iconType($relacoes_trabalho_governanca['ft_trabalhadores_vinculo']); ?>
                            @if(!empty($relacoes_trabalho_governanca['nr_trabalhadores_vinculo']))
                                <h2>{{$relacoes_trabalho_governanca['nr_trabalhadores_vinculo']}}</h2>
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
                            <?php echo iconType($relacoes_trabalho_governanca['ft_trabalhadores_deficiencia']); ?>
                            @if(!empty($relacoes_trabalho_governanca['nr_trabalhadores_deficiencia']))
                                <h2>{{$relacoes_trabalho_governanca['nr_trabalhadores_deficiencia']}}</h2>
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
                            <?php echo iconType($relacoes_trabalho_governanca['ft_trabalhadores_voluntarios']); ?>
                            @if(!empty($relacoes_trabalho_governanca['nr_trabalhadores_voluntarios']))
                                <h2>{{$relacoes_trabalho_governanca['nr_trabalhadores_voluntarios']}}</h2>
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
