@extends('layout')
@section('content')
    <script>
        email = "";
        cep = "";
        @if(!empty($email))
            email = "{{$email}}";
            cep = "{{$cep}}";
        @endif

    </script>
    <div id="register"></div>
@endsection
