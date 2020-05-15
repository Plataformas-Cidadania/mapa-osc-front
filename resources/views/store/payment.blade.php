@extends('layout')
@section('title', 'Pagamento')
@section('content')
    {{--{{ Counter::count('quem') }}--}}


    <?php
    $setting = Illuminate\Support\Facades\DB::table('settings')->orderBy('id', 'desc')->first();
    $constantPagseguroEnv =  \Illuminate\Support\Facades\Config::get('constants.pagseguroEnv');
    \PagSeguroConfig::setEnvironment($constantPagseguroEnv[$setting->pagseguro_env]);
    $pagseguro_env = \PagSeguroConfig::getEnvironment();


    ?>



    @if($pagseguro_env=='production')
        <script type="text/javascript" src="https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.lightbox.js"></script>
    @endif
    @if($pagseguro_env=='sandbox')
        <script type="text/javascript" src="https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.lightbox.js"></script>
    @endif


    <div class="container" style="min-height: 400px;">
        <div class="session text-center">
            <br><br><br><br><br>
            <h2><i class="fa fa-spinner fa-spin fa-2x"></i> Aguarde...</h2>
        </div>
    </div>

    <?php

    /*
     * ***********************************************************************
     Copyright [2011] [PagSeguro Internet Ltda.]

     Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
     * ***********************************************************************
     */

    /**
     * Class with a main method to illustrate the usage of the domain class PagSeguroPaymentRequest
     */
    class CreatePaymentRequestLightbox
    {

        public static function main($items, $order, $setting)
        {
            // Instantiate a new payment request
            $paymentRequest = new \PagSeguroPaymentRequest();

            // Set the currency
            $paymentRequest->setCurrency("BRL");

            foreach($items as $item){
                $paymentRequest->addItem($item->product_id, $item->title, $item->qtd, $item->value);
            }

            $paymentRequest->setReference($order->id);

            // Set shipping information for this payment request
            //$sedexCode = \PagSeguroShippingType::getCodeByType('SEDEX');
            $shippingCode = $order->tipo_frete;
            if($shippingCode > 3){
                $shippingCode = 3;
            }



            $paymentRequest->setShippingType($shippingCode);
            $paymentRequest->setShippingCost($order->valor_frete);
            $paymentRequest->setShippingAddress(
                    $order->cep,
                    $order->endereco,
                    $order->numero,
                    $order->complemento,
                    $order->bairro,
                    $order->cidade,
                    $order->estado,
                    'BRA'
            );

            if(auth()->user()->tipo==1){
                $nome = auth()->user()->name;
                $tipo_documento = 'CPF';
                $documento = auth()->user()->cpf;
            }else{
                $nome = auth()->user()->razao_social;
                $tipo_documento = 'CNPJ';
                $documento = auth()->user()->cnpj;
            }

            //Log::info(auth()->user()->cel);

            $celUser = auth()->user()->cel;

            $celUser = preg_replace('/[^A-Za-z0-9\.]/', '', $celUser);

            //Log::info($celUser);

            $ddd_cel = substr($celUser, 0, 2);
            $cel = substr($celUser, 2);

            //Log::info($cel);

            // Set your customer information.
            $paymentRequest->setSender(
                    $nome,
                    //'clandevelop@sandbox.pagseguro.com.br',
                    auth()->user()->email,
                    $ddd_cel,
                    $cel,
                    $tipo_documento,
                    $documento
            );

            // Set the url used by PagSeguro to redirect user after checkout process ends
            $paymentRequest->setRedirectUrl("http://homologa.nutritivarj.com.br");

            // URL para onde serão enviadas notificações (POST) indicando alterações no status da transação
            $paymentRequest->addParameter('notificationURL', 'http://homologa.nutritivarj.com.br/notification');

            // Add checkout metadata information
            //$paymentRequest->addMetadata('PASSENGER_CPF', '15600944276', 1);
            //$paymentRequest->addMetadata('GAME_NAME', 'DOTA');
            //$paymentRequest->addMetadata('PASSENGER_PASSPORT', '23456', 1);

            // Another way to set checkout parameters
            //$paymentRequest->addParameter('notificationURL', 'http://www.speedcert.com.br/nas');
            //$paymentRequest->addParameter('senderBornDate', '07/05/1981');
            //$paymentRequest->addIndexedParameter('itemId', '0003', 3);
            //$paymentRequest->addIndexedParameter('itemDescription', 'Notebook Preto', 3);
            //$paymentRequest->addIndexedParameter('itemQuantity', '1', 3);
            //$paymentRequest->addIndexedParameter('itemAmount', '2.00', 3);

            try {

                /*
                 * #### Credentials #####
                 * Replace the parameters below with your credentials
                 * You can also get your credentials from a config file. See an example:
                 * $credentials = PagSeguroConfig::getAccountCredentials();
                 */

                // seller authentication
                //$credentials = new \PagSeguroAccountCredentials("financeiro@clandevelop.com", "AC40E2CA674D4BDCB28160456E56364D");

                // application authentication
                //$credentials = \PagSeguroConfig::getApplicationCredentials();
                //$credentials = \PagSeguroConfig::getAccountCredentials();

                //$credentials->setAuthorizationCode("E231B2C9BCC8474DA2E260B6C8CF60D3");

                //dd($credentials);
                //exit;


                $token = $setting->pagseguro_production_token;

                if($setting->pagseguro_env==0){
                    $token = $setting->pagseguro_sandbox_token;
                }
                $credentials = new \PagSeguroAccountCredentials($setting->pagseguro_email, $token);


                // Register this payment request in PagSeguro to obtain the checkout code
                $onlyCheckoutCode = true;
                $code = $paymentRequest->register($credentials, $onlyCheckoutCode);

                $order_gerado = \App\Order::find($order->id);
                $data['pagseguro'] = $code;
                $order_gerado->update($data);

                self::printPaymentUrl($code, $order->id);
            } catch (\PagSeguroServiceException $e) {
                die($e->getMessage());
            }
        }

        public static function printPaymentUrl($code, $order_id)
        {
            if ($code) {
                //echo "<h2>Criando requisi&ccedil;&atilde;o de pagamento</h2>";
                //echo "<p>Code: <strong>$code</strong></p>";
                echo "
                    <script>
			            /*PagSeguroLightbox('".$code."');*/
			            PagSeguroLightbox({
                             code: '".$code."'
                             }, {
                                     success : function(transactionCode) {
                                          location.href = '/pedido/".$order_id."';
                                     },
                                     abort : function() {
                                          location.href = '/desistiu/".$order_id."';
                                 }
                        });
                    </script>";

            }
        }
    }

    CreatePaymentRequestLightbox::main($items, $order, $setting);

    ?>
@endsection