<div class="row" id="titulacao"  data-toggle="collapse" href="#multiCollapse4" role="button" aria-expanded="false" aria-controls="multiCollapse4">
    <div class="col-md-12">
        <br><br>
        <div class="title-style">
            <h2><div class="mn-accordion-icon"><i class="fas fa-certificate"></i></div> Titulações e Certificações</h2>
            <i class="fas fa-chevron-down float-right mn-accordion-arrow" style="margin-top: -20px" title="Fechar ou abrir grupo Titulações e Certificações"></i>
            <div class="line line-fix"></div>
            <hr/>
        </div>
    </div>
</div>
<div id="multiCollapse4" class="collapse multi-collapse show">
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
                <td>
                    @if($certificado->ft_inicio_certificado == 'Representante de OSC' || $certificado->ft_inicio_certificado == null)
                    @else
                        <i class="fas fa-database tx-pri"></i>
                    @endif
                    {{$certificado->dc_certificado->tx_nome_certificado}}</td>
                <td>{{formatBr($certificado->dt_inicio_certificado, 'num')}}</td>
                <td class="text-center">
                    @if($certificado->dt_fim_certificado!=null)
                        {{formatBr($certificado->dt_fim_certificado, 'num')}}
                    @else
                        -
                    @endif
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
</div>
