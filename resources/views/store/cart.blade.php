@extends('layout')
@section('title', 'Identificação')
{{--@section('keywords', keywords($quem->titulo." ".$quem->descricao, 2))
@section('description', description($quem->descricao))
@section('image', "/imagens/quemsomos/md-".$quem->imagem)--}}
@section('content')

    <div class="container">
        <h1  aria-label="Identificação"><i class="fa fa-shopping-basket" aria-hidden="true"></i> Minha cesta de compras</h1>
        <div class="line_title bg-pri"></div>

        {{--REACT COMPONENT--}}
        <script>const prazoLoja = {{$setting->prazo_loja}};</script>
        <div id="cart"></div>
        <br><br>

        {{--<div class="row">

            <div class="col-md-3 col-md-offset-9">
                <button type="button" class="btn btn-theme btn-theme-full btn-store"><i class="fa fa-shopping-basket fa-3x" aria-hidden="true"></i> Comprar</button>
                <br><br>
            </div>

            <div class="col-md-12">

                <table class="table table-hover cart-list">
                    <thead>
                    <tr>
                        <th>Produto(s)</th>
                        <th>Quantidade</th>
                        <th>Entrega</th>
                        <th>Valor Unitário</th>
                        <th>Valor Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <div class="row">
                                <div class="col-md-2">
                                    <picture>
                                        <source srcset="/imagens/products/xs-9304-129785814sz.jpg" media="(max-width: 468px)">
                                        <source srcset="/imagens/products/xs-9304-129785814sz.jpg" media="(max-width: 768px)">
                                        <source srcset="/imagens/products/xs-9304-129785814sz.jpg" class="img-responsive">
                                        <img srcset="/imagens/products/xs-9304-129785814sz.jpg" alt="Imagem sobre " title="Imagem sobre " class="img-responsive box-itens-img">
                                    </picture>
                                </div>
                                <div class="col-md-10">
                                    <p>cód.0001</p>
                                    <p>Smartphone Galaxy J3 2016 - Branco</p>
                                    <p class="cart-top-alert"><i class="fa fa-clock-o" aria-hidden="true"></i> Restam 4 itens</p>
                                </div>
                            </div>
                        </td>
                            <td>
                                <div class="cart-space"></div>


                                <form class="form-inline">
                                    <div class="form-group">
                                        <label class="sr-only" for="exampleInputAmount">Valor (en dolar)</label>
                                        <div class="input-group form-p">
                                            <input type="number" class="form-control" id="qtd" name="qtd" min="0">
                                            <div class="input-group-addon">
                                                <i class="fa fa-refresh" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <p class="cart-font-p cart-cursor"><i class="fa fa-times" aria-hidden="true"></i> Remover da cesta</p>
                                </form>
                            </td>
                        <td>
                            <h4 class="cart-top-alert">9 dias úteis </h4>
                            <p class="cart-cursor" data-toggle="modal" data-target="#myModal">Entenda o prazo</p>
                        </td>
                        <td>
                            <br>
                            <p>R$ 649,00</p>
                        </td>
                        <td>
                            <br>
                            <p>R$ 649,00</p>
                        </td>
                    </tr>
                    <tr>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>Thornton</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                    </tr>
                    </tbody>
                </table>
                <br><br>
            </div>

            <div class="col-md-7 ">
                <div class="row">
                    <div class="col-md-12">
                        <div class="box-inf">
                            <h4>Calcular frete e prazo</h4>
                            <p>Simule o prazo de entrega e o frete para seu CEP abaixo:</p>
                            <p>Atenção: O prazo começa a contar a partir da aprovação do pagamento.</p>
                            <br>
                            <input type="text" class="form-control input-lg form-cep" id="busca" name="busca" placeholder="Digite seu CEP" >

                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-5">
                <div class="row">
                    <div class="col-md-6">
                        <p>Subtotal (2 Itens):</p>
                        <hr>
                        <p>Frete (Entrega Econômica):</p>
                        <hr>
                        <h2>Total:</h2>
                    </div>
                    <div class="col-md-6 text-right">
                        <p>R$ 649,00</p>
                        <hr>
                        <p>R$ 50,00</p>
                        <hr>
                        <h2>R$ 1.649,00</h2>
                    </div>
                </div>
            </div>

            <br><br>
        </div>--}}

        {{--<div class="row">
            <div class="col-md-3">
                <br><br>
                <button type="button" class="btn btn-theme btn-theme-full btn-store btn-store-default"> Continuar comprando</button>
            </div>

            <div class="col-md-3 col-md-offset-6">
                <br><br>
                <button type="button" class="btn btn-theme btn-theme-full btn-store"><i class="fa fa-shopping-basket fa-3x" aria-hidden="true"></i> Comprar</button>
            </div>
        </div>--}}
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

