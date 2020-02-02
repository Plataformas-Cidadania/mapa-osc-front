<?php $rota = Route::getCurrentRoute()->uri();?>

<!doctype html>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Nome site - @yield('title')</title>
        {{--@include('layouts.metas')
        @include('layouts.richCards')
        @include('layouts.links')--}}
        @include('conexoes.css')
     </head>
    <body>
        @include('layouts.layout1')
    </body>
</html>

@include('conexoes.js')
