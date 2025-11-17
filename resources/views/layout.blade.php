<?php $rota = Route::getCurrentRoute()->uri();?>

<?php
    $setting = DB::table('settings')->orderBy('id', 'desc')->first();
    $base_href = config('app.url');
    $barra = "";

    $mnPortal = DB::table('modulos')->where('tipo_id', 1)->where('status', 1)->orderBy('id')->get();
    $mnDados = DB::table('modulos')->where('tipo_id', 5)->where('status', 1)->orderBy('titulo')->get();
    $mnAjuda = DB::table('modulos')->where('tipo_id', 3)->where('status', 1)->orderBy('titulo')->get();
    $midias = DB::table('midias')->where('status', 1)->where('id','!=', 1)->orderBy('titulo')->get();
?>

<!doctype html>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />
        <meta name="csrf-token" content="{{ csrf_token() }}">
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
