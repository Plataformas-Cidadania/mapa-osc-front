@extends('layout')
@section('title', 'Identificação')
{{--@section('keywords', keywords($quem->titulo." ".$quem->descricao, 2))
@section('description', description($quem->descricao))
@section('image', "/imagens/quemsomos/md-".$quem->imagem)--}}
@section('content')

    <div class="container">
        <h1  aria-label="Identificação">Forma de pagamento</h1>
        <div class="line_title bg-pri"></div>
        <div class="row">
            <div class="col-md-6">
                <h3>Resumo do pedido</h3>

                <div class="row">
                    <div class="col-md-8">
                        <picture>
                            <source srcset="/imagens/products/xs-9304-129785814sz.jpg" media="(max-width: 468px)">
                            <source srcset="/imagens/products/xs-9304-129785814sz.jpg" media="(max-width: 768px)">
                            <source srcset="/imagens/products/xs-9304-129785814sz.jpg" class="img-responsive">
                            <img srcset="/imagens/products/xs-9304-129785814sz.jpg" alt="Imagem sobre " title="Imagem sobre " class="img-responsive box-itens-img" style="float: left">
                        </picture>
                        <p>(cód.00001) Smartphone Galaxy J3 2016 - Branco</p>
                        <p>frete para SAO GONCALO</p>
                    </div>
                    <div class="col-md-4 text-right">
                        <p>R$ 690,00</p>
                        <p>Frete grátis</p>
                    </div>
                </div>

            </div>
            <div class="col-md-6">
                <h3>Endereço de entrega</h3>
                <div class="box-line">
                    <div class="row">
                        <div class="col-md-10">
                            <h3>Casa</h3>
                        </div>
                    </div>
                    <p><strong>Cep:</strong> 24457-331</p>
                    <p><strong>Endereço:</strong> Rua Cuiabá 159</p>
                    <p><strong>Complemento:</strong></p>
                    <p><strong>Bairro:</strong> Trindade</p>
                    <p><strong>Cidade:</strong> São Gonçalo</p>
                    <p><strong>Estado:</strong> RJ</p>
                </div>
            </div>
            <div class="col-md-12">
                <h3>Opções de entrega</h3>
                <br>
                <div class="row">
                    <div class="col-md-2">
                        <div class="box-line">
                            <p>Econômica<br>
                                até <strong>9</strong> dias úteis<br>
                                <strong>GRÁTIS</strong>
                            </p>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="box-line">
                            <p>Rápida<br>
                                até <strong>9</strong> dias úteis<br>
                                <strong>GRÁTIS</strong>
                            </p>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="box-line">
                            <p>Relâmpago<br>
                                até <strong>9</strong> dias úteis<br>
                                <strong>GRÁTIS</strong>
                            </p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        <div class="row">
            <div class="col-md-12">
                <br><br><br>
                <div class="row">
                    <div class="col-md-3 col-md-offset-4">
                        <button type="button" class="btn btn-theme btn-theme-full btn-store"><i class="fa fa-credit-card" aria-hidden="true"></i> Realizar pagamento</button>
                        <br><br>
                    </div>
                </div>
            </div>
        </div>
    </div>


@endsection

