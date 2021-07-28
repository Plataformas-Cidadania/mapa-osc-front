<div class="row" id="fontes-recursos"  data-toggle="collapse" href="#multiCollapse8" role="button" aria-expanded="false" aria-controls="multiCollapse8">
    <div class="col-md-12">
        <br><br>
        <div class="title-style">
            <h2><div class="mn-accordion-icon"><i class="fas fa-boxes"></i></div> Fontes de recursos anuais da OSC</h2>
            <i class="fas fa-chevron-down float-right mn-accordion-arrow" style="margin-top: -20px" title="Fechar ou abrir grupo Fontes de recursos anuais da OSC"></i>
            <div class="line line-fix"></div>
            <hr/>
        </div>
    </div>
</div>
<div id="multiCollapse8" class="collapse multi-collapse show">
    <div class="row">
        <div class="col-md-12">
            <div class="accordion" id="accordionExample">
                @foreach($recursos as $key => $recurso)
                    <div class="card">
                        <div class="card-header" id="heading{{$key}}">
                            <div class="mb-0" data-toggle="collapse" data-target="#collapse{{$key}}" aria-expanded="true" aria-controls="collapse{{$key}}">
                                {{$recurso}} <i class="fas fa-angle-down float-right"></i>
                            </div>
                        </div>
                        <div id="collapse{{$key}}" class="collapse @if($key===0) show @endif" aria-labelledby="heading{{$key}}" data-parent="#accordionExample">
                            <div class="card-body">
                                <div class="row">
                                    <?php $recursos_nome = curlListAno('recursos', $id_osc, $recurso);?>
                                    <?php
                                        $sem_recursos = curlListAno('sem_recursos', $id_osc, $recurso);

                                        $sem_recurso_origem_1 = false;
                                        $sem_recurso_origem_2 = false;
                                        $sem_recurso_origem_3 = false;
                                        $sem_recurso_origem_4 = false;

                                        if(!empty($sem_recursos)){
                                            foreach($sem_recursos as $key => $sem_recurso){

                                                if($sem_recurso['origem']['cd_origem_fonte_recursos_osc']==1){
                                                    $sem_recurso_origem_1 = true;
                                                }
                                                if($sem_recurso['origem']['cd_origem_fonte_recursos_osc']==2){
                                                    $sem_recurso_origem_2 = true;
                                                }
                                                if($sem_recurso['origem']['cd_origem_fonte_recursos_osc']==3){
                                                    $sem_recurso_origem_3 = true;
                                                }
                                                if($sem_recurso['origem']['cd_origem_fonte_recursos_osc']==4){
                                                    $sem_recurso_origem_4 = true;
                                                }

                                            }
                                        }

                                    ?>

                                    {{--//////////////////////////////////--}}
                                    @if(!empty($recursos_nome[1]))
                                        <div class="col-md-12">
                                            <h2 class="bg-pri text-light title-mp">{{$recursos_nome[1]['tx_nome_origem_fonte_recursos_osc']}}</h2>
                                        </div>
                                        @foreach($recursos_nome[1] as $key => $recurso_nome)
                                            @if(is_numeric($key))
                                                <div class="col-md-4">
                                                    <div class="line-items line-add">
                                                        <p>{{$recurso_nome['tx_nome_fonte_recursos_osc']}}</p>
                                                        <h2>{{"R$ ".number_format($recurso_nome['nr_valor_recursos_osc'], 2, ',', '.')}}</h2>
                                                    </div>
                                                </div>
                                            @endif
                                        @endforeach
                                    @else
                                        <div class="col-md-12">
                                            <h2 class="bg-pri text-light title-mp">Recursos públicos</h2>
                                        </div>
                                        <div class="col-md-12">
                                            @if($sem_recurso_origem_1==true)
                                                <p>Não possui recursos públicos</p>
                                            @else
                                                <p>Não informado</p>
                                            @endif
                                        </div>
                                    @endif
                                    {{--//////////////////////////////////--}}

                                    {{--//////////////////////////////////--}}
                                   @if(!empty($recursos_nome[2]))
                                        <div class="col-md-12">
                                            <h2 class="bg-pri text-light title-mp">{{$recursos_nome[2]['tx_nome_origem_fonte_recursos_osc']}}</h2>
                                        </div>
                                        @foreach($recursos_nome[2] as $key => $recurso_nome)
                                            @if(is_numeric($key))
                                                <div class="col-md-4">
                                                    <div class="line-items line-add">
                                                        <p>{{$recurso_nome['tx_nome_fonte_recursos_osc']}}</p>
                                                        <h2>{{"R$ ".number_format($recurso_nome['nr_valor_recursos_osc'], 2, ',', '.')}}</h2>
                                                    </div>
                                                </div>
                                            @endif
                                        @endforeach
                                    @else
                                        <div class="col-md-12">
                                            <h2 class="bg-pri text-light title-mp">Recursos privados</h2>
                                        </div>
                                        <div class="col-md-12">
                                            @if($sem_recurso_origem_2==true)
                                                <p>Não possui recursos privados</p>
                                            @else
                                                <p>Não informado</p>
                                            @endif
                                        </div>
                                    @endif
                                    {{--//////////////////////////////////--}}

                                    {{--//////////////////////////////////--}}
                                   @if(!empty($recursos_nome[3]))
                                        <div class="col-md-12">
                                            <h2 class="bg-pri text-light title-mp">{{$recursos_nome[3]['tx_nome_origem_fonte_recursos_osc']}}</h2>
                                        </div>
                                        @foreach($recursos_nome[3] as $key => $recurso_nome)
                                            @if(is_numeric($key))
                                                <div class="col-md-4">
                                                    <div class="line-items line-add">
                                                        <p>{{$recurso_nome['tx_nome_fonte_recursos_osc']}}</p>
                                                        <h2>{{"R$ ".number_format($recurso_nome['nr_valor_recursos_osc'], 2, ',', '.')}}</h2>
                                                    </div>
                                                </div>
                                            @endif
                                        @endforeach
                                    @else
                                        <div class="col-md-12">
                                            <h2 class="bg-pri text-light title-mp">Recursos não financeiros</h2>
                                        </div>
                                        <div class="col-md-12">
                                            @if($sem_recurso_origem_3==true)
                                                <p>Não possui recursos não financeiros</p>
                                            @else
                                                <p>Não informado</p>
                                            @endif
                                        </div>
                                    @endif
                                    {{--//////////////////////////////////--}}

                                    {{--//////////////////////////////////--}}
                                   @if(!empty($recursos_nome[4]))
                                        <div class="col-md-12">
                                            <h2 class="bg-pri text-light title-mp">{{$recursos_nome[4]['tx_nome_origem_fonte_recursos_osc']}}</h2>
                                        </div>
                                        @foreach($recursos_nome[4] as $key => $recurso_nome)
                                            @if(is_numeric($key))
                                                <div class="col-md-4">
                                                    <div class="line-items line-add">
                                                        <p>{{$recurso_nome['tx_nome_fonte_recursos_osc']}}</p>
                                                        <h2>{{"R$ ".number_format($recurso_nome['nr_valor_recursos_osc'], 2, ',', '.')}}</h2>
                                                    </div>
                                                </div>
                                            @endif
                                        @endforeach
                                    @else
                                        <div class="col-md-12">
                                            <h2 class="bg-pri text-light title-mp">Recursos próprios</h2>
                                        </div>
                                        <div class="col-md-12">
                                            @if($sem_recurso_origem_4==true)
                                                <p>Não possui recursos próprios</p>
                                            @else
                                                <p>Não informado</p>
                                            @endif
                                        </div>
                                    @endif
                                    {{--//////////////////////////////////--}}


                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</div>
