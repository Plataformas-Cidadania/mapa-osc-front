<!doctype html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Declaração - {{$osc->tx_razao_social_osc}}</title>
</head>
<body>
<div id="printDivCertificate" class="conteudoCertificate" style="padding-left: 0;">
    <div class="row printOff">
        <div class="col-md-12 text-center">
            <div class="tx-print">
                {{--/////////--}}
                <div>
                    <?php
                    $logo = "img/sem-imagem.png";
                    if(substr($osc->im_logo, 0, 10)=='data:image'){
                        $logo =  $osc->im_logo;
                    }else{
                        $api = env('APP_API_ROUTE');
                        if(env('LOCALHOST_DOCKER') == 1){
                            $api = env('HOST_DOCKER')."api/";
                        }
                        $pagina = $api."osc/logo/".$id_osc;
                        $ch = curl_init();
                        curl_setopt($ch, CURLOPT_URL, $pagina);
                        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                        $logo = curl_exec($ch);
                        $error = curl_error($ch);
                        curl_close($ch);
                        $logo = substr($logo, 1);
                        $logo = substr($logo, 0, -1);
                        $logo = str_replace("\\", "", $logo);
                    }
                    /*if($logo==""){
                        $logo = "img/sem-imagem.png";
                    }*/
                    ?>
                    @if($logo!=="")
                        <img src="{{$logo}}" alt="{{$osc->tx_razao_social_osc}}" title="{{$osc->tx_razao_social_osc}}" width="120" style="position: absolute; top: -130px; left: 600px">
                    @endif



                </div>
                {{--/////////--}}



                <br>
                <h2 id="title">Declaração</h2>
                <p>
                    Declaramos que {{$osc->tx_razao_social_osc}} (CNPJ {{$osc->cd_identificador_osc}}) está cadastrada
                    no Mapa das Organizações da Sociedade Civil até a data de {{date('d/m/Y')}}.
                </p>
                <div>{!! QrCode::size(250)->generate(env('APP_URL').'detalhar/'.$id_osc.'/'.clean($osc->tx_razao_social_osc)); !!}</div>
                <br>
                <div class="text-center footer-print">mapaosc.ipea.gov.br</div>
            </div>
            <img src="{{env('APP_URL')}}/img/declaration.jpg" class="bg-print">
            <div></div>
        </div>
    </div>
</div>
<style>
    h2{
        text-align: center;
        font-size: 35px;
    }
    p{
        text-align: center;
        line-height: 30px;
        font-size: 18px;
        padding: 50px 100px;
    }
    /*Print Certificado*/
    .tx-print{
        position: relative;
        z-index:1;
        width:100%;

        margin-top: 200px;
    }
    .bg-print{
        width:100%;
        height:auto;
        position: absolute;
        top: 0;
        left:0;
        z-index:0;
        margin: 0;
    }
    .btn-aling{
        margin-top: 10px;
    }
    .footer-print{
        width: 100%;
        position: fixed;
        bottom: 0;
        padding: 20px 0;
        text-align: center;
        margin: auto;
    }
    .conteudoCertificate{
        display: block;
        font-family: Verdana, Arial, Helvetica, sans-serif;
    }
    .printOff{
        display: none;
    }
    @media print {
        .printOff{
            display: block;
        }
        .conteudoCertificate{
            display: block;
        }
        @page {
            size:A4 landscape;
            margin: 0;
        }
        body {
            margin: 0;
        }
    }
</style>
<script>
    window.print();
</script>
</body>
</html>


