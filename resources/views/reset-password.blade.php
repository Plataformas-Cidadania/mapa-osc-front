@extends('layout')
@section('content')
    <script>
        token = "{{$token}}";
        email = "{{$email}}";
    </script>
    <div id="reset-password"></div>
@endsection