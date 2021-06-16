<?php $tags = \App\Versao::where('status', 1)->orderBy('posicao')->get();?>

@foreach($tags as $tag)
    <?php

    $coordinators = \App\ItemVersao::
        select('integrantes.imagem', 'integrantes.titulo', 'integrantes.url', 'items_versoes.funcao', 'items_versoes.instituicao')
        ->join('integrantes', 'integrantes.id', '=', 'items_versoes.integrante_id')
        ->where('status', 1)
        ->where('versao_id', $tag->id)
        ->where('tipo_id', 1)
        ->orderBy('titulo')
        ->get();

    $teams = \App\ItemVersao::
        select('integrantes.imagem', 'integrantes.titulo', 'integrantes.url', 'items_versoes.funcao', 'items_versoes.instituicao')
        ->join('integrantes', 'integrantes.id', '=', 'items_versoes.integrante_id')
        ->where('status', 1)
        ->where('versao_id', $tag->id)
        ->whereIn('tipo_id', [2, 3])
        ->orderBy('tipo_id', 'DESC')
        ->orderBy('titulo')
        ->get();

    ?>
    <div>
        <div class="row">
            <div class="col-md-12">
                <br>
                <h3><i class="fas fa-tag tx-pri"></i> {{$tag->titulo}}</h3>
                <p>{!! $tag->descricao !!}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <strong>Coordenador</strong><br><br>
            </div>
            <div class="col-md-12">
                @foreach($coordinators as $coordinator)
                    <div class="list-user">
                        <img src="images/integrantes/xs-{{$coordinator->imagem}}" alt="" class="rounded-circle float-left" width="50">
                        <h4>{{$coordinator->titulo}}</h4>
                        <p>{{$coordinator->descricao}}sss</p>
                    </div>
                @endforeach
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-12">
                <strong>Equipe</strong><br><br>
            </div>
            <div class="col-md-12">
                <div class="row">
                    @foreach($teams as $team)
                    <div class="col-md-4">
                        <div class="list-user">
                            <img src="images/integrantes/xs-{{$coordinator->imagem}}" alt="" class="rounded-circle float-left" width="50">
                            <h4>{{$team->titulo}}</h4>
                            <p>{{$team->funcao}}&nbsp; @if($team->instituicao!="") - <strong>&nbsp;{{$team->instituicao}}</strong> @endif</p>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>
        </div>
        <hr>
    </div>
@endforeach

