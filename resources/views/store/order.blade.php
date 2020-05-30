@extends('layout')
@section('title', 'Pagamento')
@section('content')

    {{--{{ Counter::count('quem') }}--}}
    <script type="text/javascript" src="https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.lightbox.js"></script>
    <div class="container print">
        <h2 class="text-primary">Pedido {{str_pad($order->id, 5, 0, STR_PAD_LEFT)}}</h2>
        <div class="line_title bg-pri"></div>

        <session class="container">

            <div class="row">
                <div class="col-md-2 col-md-offset-10 text-right  no-print">
                    <i class="fa fa-print fa-3x " aria-hidden="true" onclick="window.print();" style="cursor: pointer;"></i>
                </div>
                <div class="col-md-12">
                    <h2><i class="fa fa-check-circle-o" aria-hidden="true"></i> Agradecemos por comprar na {{$settings->titulo}}!</h2>
                    <div class="fillet"></div>
                    <p>Seu pedido foi realizado com sucesso! Você receberá um e-mail com todos os detalhes do seu pedido.</p>
                </div>
            </div>
            <br><br><br>
            <div class="row">
                <div class="col-md-12">
                    <h2><i class="fa fa-shopping-basket" aria-hidden="true"></i> Items do Pedido:</h2>
                    <div class="fillet"></div>
                    <table class="table table-hover">
                        <thead>
                        <tr>
                            <th>Nome do Produto</th>
                            <th>Quantidade</th>
                            <th>Valor unitario</th>
                            <th>Valor Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        <?php $total=0;?>
                        @foreach($order->items()->get() as $item)
                            <?php $produto = DB::table('products')->where('id', $item->product_id)->first();?>
                                <tr>
                                    <th scope="row"><img src="/imagens/products/xs-{{$produto->imagem}}" alt="" width="70"> {{$item->title}}</th>
                                    <td>{{$item->qtd}}</td>
                                    <td>R$ {{number_format($item->value, 2, ',', '.')}}</td>
                                    <td>R$ {{number_format($item->qtd*$item->value, 2, ',', '.')}}</td>
                                </tr>

                            <?php $total += $item->qtd * $item->value;?>
                        @endforeach

                        <?php
                        $tiposFrete = [1 => 'PAC', 2 => 'SEDEX', 3 => 'RETIRAR NA LOJA', 4 => 'NUTRITIVA'];


                        ?>
                            <tr>
                                <th scope="row">Frete ({{$tiposFrete[$order->tipo_frete]}})</th>
                                <td></td>
                                <td></td>
                                <td>R$ {{number_format($order->valor_frete, 2, ',', '.')}}</td>
                            </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td class="text-right"><h3>Total:</h3></td>
                            <td class="text-primary text-right"><h3>R$ {{number_format($total+$order->valor_frete, 2, ',', '.')}}</h3></td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div class="col-md-6">
                    <h2><i class="fa fa-user-circle-o" aria-hidden="true"></i> Seus dados:</h2>
                    <div class="fillet"></div>
                    <p>{{$users->name}}</p>
                    <p>{{$users->email}}</p>
                    <p><strong>Cel.:</strong> {{$users->cel}}</p>
                    <p><strong>CPF.:</strong> {{$users->cpf}}</p>

                </div>
                <div class="col-md-6">
                    <h2><i class="fa fa-map-marker" aria-hidden="true"></i> Endereço de entrega:</h2>
                    <div class="fillet"></div>
                    <p>CEP.: {{$order->cep}}</p>
                    <p>{{$order->endereco}}, {{$order->numero}} {{$order->complemento}} </p>
                    <p>{{$order->bairro}}, {{$order->cidade}} {{$order->estado}} </p>
                </div>
                <div class="col-md-12">
                    <br><br><br>
                    <h2><i class="fa fa-shopping-basket" aria-hidden="true"></i> Prazo de Entrega:</h2>
                    <div class="fillet"></div>
                    {{--<p>Seu pedido será entregue em até 5 dia(s) útil(eis) após a confirmação do pagamento.</p><br>--}}
                    <p>O prazo de entrega se inicia a partir da data de confirmação do pagamento. Em caso de atraso ou erro no reconhecimento do pagamento, a
                        data prevista será alterada.</p>
                </div>
                <div class="col-md-12">

                </div>
            </div>


        </session>

    </div>
@endsection