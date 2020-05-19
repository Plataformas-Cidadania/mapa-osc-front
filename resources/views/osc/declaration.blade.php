<div id="printDivCertificate" class="conteudoCertificate container-fluid" style="padding-left: 0;">
    <div class="row">
        <div class="col-md-12 text-center">
            <div class="tx-print">
                <br>
                <h2 id="title">Declaração</h2>
                <p>
                  Declaramos que 002/ES GRUPO ESCOTEIRO LOREN RENO (CNPJ07744937000110) está cadastrada
                    no Mapa das Organizações da Sociedade Civil até a data de 18/05/2020.
                </p>
                <div>{!! QrCode::size(250)->generate($_SERVER['SERVER_NAME'].'/detalhar/1111/nome'); !!}</div>
                <br>
                <div class="text-center footer-print">mapaosc.ipea.gov.br</div>
            </div>
            <img src="img/declaration.jpg" class="bg-print">
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
    @media print {
        .conteudoCertificate{
            display: block;
        }
        @page {
            size:A4 landscape;
            margin: 0;
        }
    }
</style>
