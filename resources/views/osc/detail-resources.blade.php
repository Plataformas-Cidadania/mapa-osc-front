<div class="row" id="fontesRecursos"  data-toggle="collapse" href="#multiCollapse8" role="button" aria-expanded="false" aria-controls="multiCollapse8">
    <div class="col-md-12">
        <br><br>
        <div class="title-style">
            <h2><div class="mn-accordion-icon"><i class="fas fa-boxes"></i></div> Fontes de recursos anuais da OSC</h2>
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
                                {{$recurso->dt_ano_recursos_osc}} <i class="fas fa-angle-down float-right"></i>
                            </div>
                        </div>
                        <div id="collapse{{$key}}" class="collapse @if($key===0) show @endif" aria-labelledby="heading{{$key}}" data-parent="#accordionExample">
                            <div class="card-body">
                                <div class="row">
                                    <?php $recursos_nome = DB::connection('map')->table('portal.vw_osc_recursos_osc')->select('tx_nome_origem_fonte_recursos_osc')->where('id_osc', $id_osc)->where('dt_ano_recursos_osc', $recurso->dt_ano_recursos_osc)->orderBy('tx_nome_origem_fonte_recursos_osc', 'desc')->distinct()->get();?>
                                    @foreach($recursos_nome as $key => $recurso_nome)
                                        <?php $recursos_propios = DB::connection('map')->table('portal.vw_osc_recursos_osc')->where('id_osc', $id_osc)->where('dt_ano_recursos_osc', $recurso->dt_ano_recursos_osc)->where('tx_nome_origem_fonte_recursos_osc', $recurso_nome->tx_nome_origem_fonte_recursos_osc)->get();?>
                                        <div class="col-md-12">
                                            <h2 class="bg-pri text-light title-mp">{{$recurso_nome->tx_nome_origem_fonte_recursos_osc}}</h2>
                                        </div>
                                        @foreach($recursos_propios as $key => $recurso_propio)
                                            <div class="col-md-4">
                                                <div class="line-items line-add">
                                                    <p>{{$recurso_propio->tx_nome_fonte_recursos_osc}}</p>
                                                    <h2>{{"R$ ".number_format($recurso_propio->nr_valor_recursos_osc, 2, ',', '.')}}</h2>
                                                </div>
                                            </div>
                                        @endforeach
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</div>
