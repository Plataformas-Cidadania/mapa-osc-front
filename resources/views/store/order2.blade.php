@extends('layout')
@section('title', 'Identificação')
{{--@section('keywords', keywords($quem->titulo." ".$quem->descricao, 2))
@section('description', description($quem->descricao))
@section('image', "/imagens/quemsomos/md-".$quem->imagem)--}}
@section('content')

    <div class="container">
        <h2  aria-label="Identificação">Pedido realizado</h2>
        <div class="line_title bg-pri"></div>
        <div class="row">
            <div class="col-md-12">
                <p>Obrigado <strong>Fulano</strong>, por comprar na <strong>site.com.br</strong></p>
                <br>
            </div>
        </div>
        {{-->>>>>--}}
        <div>
            <div class="bg-ter">
                <div class="row">
                    <div class="col-md-6 col-sm-6 ">
                        <h5 class="title-store">Anote o número do seu pedido </h5>
                    </div>
                    <div class="col-md-6 col-sm-6 text-right">
                        <h5 class="title-store">Pedido realizado em <strong>02/12/2016</strong> </h5>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <h2>002565</h2>
                    <p>Você receberá a confirmação do pedido e do pagamento em seu e-mail cadastrado: </p>
                    <br>
                </div>
            </div>
        </div>
        {{--<<<<<--}}
        {{-->>>>>--}}
        <div>
            <div class="bg-ter">
                <div class="row">
                    <div class="col-md-6 col-sm-12">
                        <h5 class="title-store">Forma de pagamento</h5>
                    </div>
                </div>
            </div>
            <div class="row text-center">
                <div class="col-md-12">
                    <br>
                    <img src="/img/logo_pagseguro.png" alt="pagseguro">
                    <br><br>
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <button type="button" class="btn btn-theme btn-store btn-store-p"><i class="fa fa-credit-card" aria-hidden="true"></i> Gerar pagamento</button>
                        </div>
                    </div>
                    <br>
                    <p>Apos a Confirmação do pagamento estaremos dando continuidade na entrega do produto</p>
                </div>
            </div>
        </div>
        {{--<<<<<--}}
        <br>
        {{-->>>>>--}}
        <div class="row">
            <div class="col-lg-8">
                <div class="bg-ter">
                    <div class="row">
                        <div class="col-md-12 col-sm-12">
                            <h5 class="title-store">Pedido</h5>
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-md-2">
                        <picture>
                            <source srcset="/imagens/products/xs-7221-palio.jpg" media="(max-width: 468px)">
                            <source srcset="/imagens/products/xs-7221-palio.jpg" media="(max-width: 768px)">
                            <source srcset="/imagens/products/xs-7221-palio.jpg" class="img-responsive">
                            <img srcset="/imagens/products/xs-7221-palio.jpg" alt="Imagem sobre " title="Imagem sobre " class="img-responsive">
                        </picture>
                    </div>
                    <div class="col-md-10">
                        <p>Notebook Samsung Expert X19 Intel Core i5 4GB 500GB Tela LED FULL HD 15.6 Windows 10 - Preto</p>
                        <p><strong>R$ 690,00</strong></p>
                    </div>
                </div>
                <hr>
                <br>
                <div class="row">
                    <div class="col-md-2">
                        <picture>
                            <source srcset="/imagens/products/xs-7221-palio.jpg" media="(max-width: 468px)">
                            <source srcset="/imagens/products/xs-7221-palio.jpg" media="(max-width: 768px)">
                            <source srcset="/imagens/products/xs-7221-palio.jpg" class="img-responsive">
                            <img srcset="/imagens/products/xs-7221-palio.jpg" alt="Imagem sobre " title="Imagem sobre " class="img-responsive">
                        </picture>
                    </div>
                    <div class="col-md-10">
                        <p>Notebook Samsung Expert X19 Intel Core i5 4GB 500GB Tela LED FULL HD 15.6 Windows 10 - Preto</p>
                        <p><strong>R$ 690,00</strong></p>
                    </div>
                </div>
                <hr>
                <h3><strong>Total: R$ 700,00</strong></h3>
                <br>
            </div>
            <div class="col-lg-4">
                <div class="bg-ter">
                    <div class="row">
                        <div class="col-md-6 col-sm-12">
                            <h5 class="title-store">Previsão de entrega</h5>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 text-center">
                        <h2><strong>30</strong></h2>
                        <p><strong>dias úteis</strong></p>
                        <br>
                        <p>O Prazo acima começa a contar a partir da aprovação do pedido pela instituição financeira.</p>
                    </div>
                </div>
            </div>
        </div>
        {{--<<<<<--}}

    </div>
@endsection

