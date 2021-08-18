@extends('layout')
@section('content')
    <script>
        <?php /*
        token = "{{$token}}";
        email = "{{$email}}";
        */?>
        id_usuario = "{{$id_usuario}}";
        hash = "{{$hash}}";
    </script>
    <div id="reset-password"></div>
@endsection
