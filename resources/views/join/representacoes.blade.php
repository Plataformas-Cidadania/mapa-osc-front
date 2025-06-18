@extends('layout')
@section('content')
    <script>
        email = "";
        @if(!empty($email))
            email = "{{$email}}";
        @endif

    </script>
    <div id="representacoes"></div>
@endsection
