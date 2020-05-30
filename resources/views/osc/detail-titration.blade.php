<div class="row" id="titulacao"  data-toggle="collapse" href="#multiCollapse4" role="button" aria-expanded="false" aria-controls="multiCollapse4">
    <div class="col-md-12">
        <br><br>
        <div class="title-style">
            <h2><div class="mn-accordion-icon"><i class="fas fa-certificate"></i></div> Titulações e Certificações</h2>
            <div class="line line-fix"></div>
            <hr/>
        </div>
    </div>
</div>
<div id="multiCollapse4" class="collapse multi-collapse show">
    <?php $certificacoes = DB::connection('map')->table('portal.vw_osc_certificado')->where('id_osc', $id_osc)->get();?>
    <table class="table">
        <thead class="bg-pri text-light">
        <tr>
            <th scope="col">Titulo / Certificado</th>
            <th scope="col">Início da validade</th>
            <th scope="col">Fim da validade</th>
        </tr>
        </thead>
        <tbody>
        @foreach($certificacoes as $certificado)
            <tr>
                <td>{{$certificado->tx_nome_certificado}}</td>
                <td>{{formatBr($certificado->dt_inicio_certificado, 'num')}}</td>
                <td>{{formatBr($certificado->dt_fim_certificado, 'num')}}</td>
            </tr>
        @endforeach
        </tbody>
    </table>
</div>
