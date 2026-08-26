<?php

    $rota = Route::getCurrentRoute()->uri();

    $setting = DB::table('settings')->orderBy('id', 'desc')->first();
    $base_href = config('app.url');
    $barra = "";
    $mnPortal = DB::table('modulos')->where('tipo_id', 1)->where('status', 1)->orderBy('id')->get();
    $mnDados = DB::table('modulos')->where('tipo_id', 5)->where('status', 1)->orderBy('titulo')->get();
    $mnAjuda = DB::table('modulos')->where('tipo_id', 3)->where('status', 1)->orderBy('titulo')->get();
    $midias = DB::table('midias')->where('status', 1)->where('id','!=', 1)->orderBy('titulo')->get();
    $moduloConselhos = DB::table('modulos')->where('slug', 'conselhos')->where('status', 1)->first();

?>
<!doctype html>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <style>html{visibility:hidden}</style>
        <script>
            (function(){
                var token = localStorage.getItem('@App:token');

                function liberar(){
                    document.documentElement.style.visibility = 'visible';
                }

                if(!token){
                    liberar();
                    return;
                }

                if(window.location.pathname.indexOf('trocar-senha') !== -1){
                    liberar();
                    return;
                }

                var apiUrl = "{{ rtrim(env('APP_API_ROUTE', ''), '/') }}/";

                var xhr = new XMLHttpRequest();
                xhr.open('GET', apiUrl + 'get-user-auth', true);
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);

                xhr.onload = function() {

                    if(xhr.status === 200) {

                        try {

                            var usuario = JSON.parse(xhr.responseText);

                            if(usuario && usuario.troca_senha_obrigatoria) {

                                localStorage.setItem('@App:mensagemTrocaSenhaObrigatoria', usuario.mensagem_troca_senha_obrigatoria || 'Recentemente, identificamos o seu usuário em uma lista de e-mails vazados. Por uma questão de precaução, solicitamos que altere sua senha para continuar usando o Mapa das OSC.');
                                window.location.replace('/trocar-senha');

                                return;

                            }

                        } catch(e){}

                    }

                    liberar();

                };

                xhr.onerror = function(){
                    liberar();
                };

                xhr.send();
            })();
        </script>

        <title>{{$setting->titulo}} - @yield('title')</title>
        <base href="{{$base_href}}{{$barra}}">
        @include('layouts.metas')
        @include('layouts.links')
        @include('conexoes.css')

    <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-KX3DW5V6TJ"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-KX3DW5V6TJ');
        </script>
     </head>
    <body id="contrast" >
        @include('layouts.layout1')
        <!-- Piwik -->
        {{--<script type="text/javascript">
            var _paq = _paq || [];
            _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
            _paq.push(["setDomains", ["*.mapaosc","*.mapaosc.ipea.gov.br"]]);
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
                var u="/webstats/";
                _paq.push(['setTrackerUrl', u+'piwik.php']);
                _paq.push(['setSiteId', 2]);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
            })();
        </script>
        <noscript><p><img src="//mapaosc.ipea.gov.br/webstats/piwik.php?idsite=2" style="border:0;" alt="" /></p></noscript>--}}
        <!-- End Piwik Code -->
    </body>
</html>


<style type="text/css">
    .contrast-off{

    }
    .contrast{
        background-color: #000000!important;
        color: #FFFFFF!important;
    }
    .contrast > div{
        background-color: #000000!important;
        color: #FFFFFF!important;
    }
    .contrast > div > div{
        background-color: #000000!important;
        color: #FFFFFF!important;
    }
    .contrast > div > div > div{
        background-color: #000000!important;
        color: #FFFFFF!important;
    }
    .contrast > header > div > div > div > nav{
        background-color: #000000!important;
        color: #FFFFFF!important;
    }
</style>

@include('conexoes.js')