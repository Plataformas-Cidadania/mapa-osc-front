@extends('layout')

@section('title', 'Conselhos')

@section('content')

<?php
    $modulo = DB::table('modulos')->where('slug', 'conselhos')->where('status', 1)->first();
    $webdoors = \App\Webdoor::orderBy('posicao')->where('status', 1)->get();
 ?>

<script>
    var moduloConselhos = {
        titulo: {!! json_encode(optional($modulo)->titulo ?? 'Conselhos Públicos') !!},
        descricao: {!! json_encode(optional($modulo)->descricao ?? 'Transparência e participação social através dos conselhos e seus conselheiros') !!}
    };
</script>
<div id="conselhos-publicos"></div>
@endsection
