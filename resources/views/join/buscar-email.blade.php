@extends('layout')
@section('content')
    <script>
        email = "";
        @if(!empty($email))
            email = "{{$email}}";
        @endif

    </script>
    <div id="buscar-email"></div>
@endsection
