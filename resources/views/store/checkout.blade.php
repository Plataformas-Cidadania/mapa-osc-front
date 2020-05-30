@extends('layout')
@section('title', 'Identificação')
{{--@section('keywords', keywords($quem->titulo." ".$quem->descricao, 2))
@section('description', description($quem->descricao))
@section('image', "/imagens/quemsomos/md-".$quem->imagem)--}}
@section('content')

    <div class="container">
        <h1  aria-label="Identificação"><i class="fa fa-truck" aria-hidden="true"></i> Escolha as opções de entrega!</h1>
        <div class="line_title bg-pri"></div>

        {{--REACT COMPONENT--}}
        <script>
            const prazoLoja = 3;
            const cep = '24457331';
        </script>
        <div id="checkout"></div>
        <br><br>


    </div>

    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Cálculo do prazo de entrega</h4>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-12">
                            <p>O prazo de entrega é contado em dias úteis, ou seja, não inclui sábados, domingos e feriados.</p>
                            <br>
                            <ul>
                                <li>Dia útil para entrega</li>
                                <li>De segunda a sexta-feira das 8:00h às 18:00h</li>
                            </ul>
                            <br>
                            <p>* Excepcionalmente entregas podem ocorrer aos sábados, domingos e feriados.</p>
                            <p>Caso ainda tenha dúvidas sobre entrega, entre em contoto</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

