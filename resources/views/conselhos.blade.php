@extends('layout')

@section('title', 'Conselhos')

@section('content')
<div id="conselhos-publicos"></div>
@endsection

@section('script')
<script src="{{ asset('js/components/public/conselhos-publicos.js') }}"></script>
@endsection