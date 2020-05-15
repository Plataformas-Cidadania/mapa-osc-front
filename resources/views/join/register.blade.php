@extends('layout')
@section('content')
    <script>
        carrinho = "";
        email = "";
        cep = "";
        @if(!empty($email))
            carrinho = "{{$carrinho}}";
            email = "{{$email}}";
            cep = "{{$cep}}";
        @endif

    </script>
    <div id="register"></div>
@endsection