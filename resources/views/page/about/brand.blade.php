<?php
    $artwork = DB::table('artworks')->where('version', 0)->where('format', 'png')->first();
    $artworkJpg = DB::table('artworks')->where('version', 0)->where('format', 'jpg')->first();
    $artworkVert = DB::table('artworks')->where('version', 1)->where('format', 'png')->first();
    $artworkVertJpg = DB::table('artworks')->where('version', 1)->where('format', 'jpg')->first();
    $directivesType = DB::table('directives')
        ->select('directives.type')
        ->distinct()
        ->orderBy('type')
        ->get();
    $printingsManual = DB::table('printings')->where('type', 0)->first();
    $printings = DB::table('printings')->where('type','!=', 0)->get();

    $versoes = DB::table('versoes')->where('status', 1)->orderBy('posicao')->get();
?>
<br>
<style>
    .nav-pills .nav-link.active, .nav-pills .show > .nav-link {
        color: #fff;
        background-color: #3A559B;
    }
    .nav-link{
        border-bottom: 3px solid #EEEEEE;
        border-radius: 0;

    }
    .nav-link:hover{
        border-bottom: 3px solid #3A559B;
    }
    .nav-link:focus{
        background-color: #3A559B;
    }
    .nav-pills .nav-link {
        border-radius: 0;
    }
</style>

<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
    <li class="nav-item">
        <a class="nav-link active" id="pills-diretiva-tab" data-toggle="pill" href="#pills-diretiva" role="tab" aria-controls="pills-home" aria-selected="true">Diretivas</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" id="pills-horizontal-tab" data-toggle="pill" href="#pills-horizontal" role="tab" aria-controls="pills-profile" aria-selected="false">Versões horizontais</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" id="pills-vertical-tab" data-toggle="pill" href="#pills-vertical" role="tab" aria-controls="pills-contact" aria-selected="false">Versões verticais</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" id="pills-impressao-tab" data-toggle="pill" href="#pills-impressao" role="tab" aria-controls="pills-contact" aria-selected="false">Impressão em altaresolução</a>
    </li>
    <li class="nav-item">
        @if($printingsManual)<a class="nav-link" id="pills-manual-tab" data-toggle="pill" href="#pills-manual" role="tab" aria-controls="pills-contact" aria-selected="false">Manual</a>@endif
    </li>
</ul>
<div class="tab-content" id="pills-tabContent">
    <div class="tab-pane fade show active" id="pills-diretiva" role="tabpanel" aria-labelledby="pills-diretiva-tab">
        {{--///////////////--}}
        <?php $cont1=0;?>
        <?php $cont2 = 0;?>
        @foreach($directivesType as $directiveType)
            <?php

            switch ($directiveType->type) {
                case 1:
                    $valor_cont = 'Versões da Marca';
                    break;
                case 2:
                    $valor_cont = 'Reduções mínimas';
                    break;
                case 3:
                    $valor_cont = 'Usando com outras marcas';
                    break;
                case 4:
                    $valor_cont = 'Utilização em aplicações';
                    break;
                case 5:
                    $valor_cont = 'Erros comuns';
                    break;
            }
            ?>
            <style>
                .btn-dd{
                    float: right;
                    cursor: pointer;
                    margin: 10px;
                    color: #3A559B;
                }
            </style>

            <div class="bg-qui">
                <p style="padding:15px 0 0 10px; float: left;"><strong>{{$valor_cont}}</strong></p>
                <i class="fa fa-minus-square fa-2x btn-dd"  style=" @if($cont1>0) display: none; @else display: block; @endif " id="minus-<?php echo $cont1;?>" aria-hidden="true"  onclick="minusDd('<?php echo $cont1;?>')"></i>
                <i class="fa fa-plus-square fa-2x btn-dd" style=" @if($cont1>0) display: block; @else display: none; @endif " aria-hidden="true" id="plus-<?php echo $cont1;?>"  onclick="plusDd('<?php echo $cont1;?>')"></i>
                <hr>
                <div style="clear: both;"></div>

            </div>

            <script>
                function minusDd(id){
                    document.getElementById('tabela-'+id).style = "display: none";
                    document.getElementById('minus-'+id).style = "display: none";
                    document.getElementById('plus-'+id).style = "display: block";
                }
                function plusDd(id){
                    document.getElementById('tabela-'+id).style = "display: block";
                    document.getElementById('minus-'+id).style = "display: block";
                    document.getElementById('plus-'+id).style = "display: none";
                }
            </script>
            <?php $directives = DB::table('directives')->where('type', $directiveType->type)->get();?>

            <div id="tabela-{{$cont1}}" style=" @if($cont1>0) display: none; @else display: block; @endif ">
                <div class="row" >
                    @foreach($directives as $directive)
                        <br>
                        <br>
                        <div class="col-md-3" style="border-right: solid 1px #EEEEEE; height: 100%; "><p>{!! $directive->description !!}</p></div>
                        <div class="col-md-2 text-center"><h4 style="vertical-align: middle;"><strong>{{$directive->title}}</strong></h4></div>
                        <div class="col-md-7" style="border-left: solid 1px #EEEEEE;"><img srcset="imagens/directives/md-{{$directive->imagem}}" alt="Imagem sobre, {{$directive->title}}" title="Imagem sobre, {{$directive->title}}" style="width: 100%;"></div>
                        <hr>
                        <br>
                        <?php $cont2++;?>
                    @endforeach
                </div>
            </div>



            <?php $cont1++;?>
        @endforeach

        {{--///////////////--}}
    </div>
    <div class="tab-pane fade" id="pills-horizontal" role="tabpanel" aria-labelledby="pills-horizontal-tab">
        {{--//////////--}}
        @if($artwork)
        <div class="row">
            <div class="col-md-4 box-marca">
                <div><img srcset="imagens/artworks/72-{{$artwork->imagem}}" alt="{{$artwork->title}}" title="{{$artwork->title}}" ></div>
                <h5>72px de largura × 28px de altura</h5><br>
                <i class="fa fa-download fa-2x" style="color: #3498DB;" aria-hidden="true"></i><br><br>
                <p><a href="imagens/artworks/72-{{$artwork->imagem}}" target="_blank">PNG</a> | <a href="imagens/artworks/72-{{$artworkJpg->imagem}}" target="_blank">JPG</a></p>
            </div>
            <div class="col-md-4 box-marca">
                <div><img srcset="imagens/artworks/96-{{$artwork->imagem}}" alt="{{$artwork->title}}" title="{{$artwork->title}}" ></div>
                <h5>96px de largura × 37px de altura</h5><br>
                <i class="fa fa-download fa-2x" style="color: #3498DB;" aria-hidden="true"></i><br><br>
                <p><a href="imagens/artworks/72-{{$artwork->imagem}}" target="_blank">PNG</a> | <a href="imagens/artworks/96-{{$artworkJpg->imagem}}" target="_blank">JPG</a></p>
            </div>
            <div class="col-md-4 box-marca">
                <div><img srcset="imagens/artworks/114-{{$artwork->imagem}}" alt="{{$artwork->title}}" title="{{$artwork->title}}" ></div>
                <h5>114px de largura × 44px de altura</h5><br>
                <i class="fa fa-download fa-2x" style="color: #3498DB;" aria-hidden="true"></i><br><br>
                <p><a href="imagens/artworks/114-{{$artwork->imagem}}" target="_blank">PNG</a> | <a href="imagens/artworks/114-{{$artworkJpg->imagem}}" target="_blank">JPG</a></p>
            </div>
            <div class="col-md-12">
                <br><hr><br>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4 box-marca">
                <div><img srcset="imagens/artworks/128-{{$artwork->imagem}}" alt="{{$artwork->title}}" title="{{$artwork->title}}" ></div>
                <h5>128px de largura × 50px de altura</h5><br>
                <i class="fa fa-download fa-2x" style="color: #3498DB;" aria-hidden="true"></i><br><br>
                <p><a href="imagens/artworks/128-{{$artwork->imagem}}" target="_blank">PNG</a> | <a href="imagens/artworks/128-{{$artworkJpg->imagem}}" target="_blank">JPG</a></p>
            </div>
            <div class="col-md-4 box-marca">
                <div><img srcset="imagens/artworks/144-{{$artwork->imagem}}" alt="{{$artwork->title}}" title="{{$artwork->title}}" ></div>
                <h5>144px de largura × 56px de altura</h5><br>
                <i class="fa fa-download fa-2x" style="color: #3498DB;" aria-hidden="true"></i><br><br>
                <p><a href="imagens/artworks/144-{{$artwork->imagem}}" target="_blank">PNG</a> | <a href="imagens/artworks/144-{{$artworkJpg->imagem}}" target="_blank">JPG</a></p>
            </div>
            <div class="col-md-4 box-marca">
                <div><img srcset="imagens/artworks/256-{{$artwork->imagem}}" alt="{{$artwork->title}}" title="{{$artwork->title}}" ></div>
                <h5>256px de largura × 100px de altura</h5><br>
                <i class="fa fa-download fa-2x" style="color: #3498DB;" aria-hidden="true"></i><br><br>
                <p><a href="imagens/artworks/256-{{$artwork->imagem}}" target="_blank">PNG</a> | <a href="imagens/artworks/256-{{$artworkJpg->imagem}}" target="_blank">JPG</a></p>
            </div>
            <div class="col-md-12">
                <br><hr><br>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 box-marca">
                <div><img srcset="imagens/artworks/512-{{$artwork->imagem}}" alt="{{$artwork->title}}" title="{{$artwork->title}}" ></div>
                <h5>512x de largura × 199px de altura</h5><br>
                <i class="fa fa-download fa-2x" style="color: #3498DB;" aria-hidden="true"></i><br><br>
                <p><a href="imagens/artworks/512-{{$artwork->imagem}}" target="_blank">PNG</a> | <a href="imagens/artworks/512-{{$artworkJpg->imagem}}" target="_blank">JPG</a></p>
            </div>
            <div class="col-md-12">
                <br><hr><br>
            </div>
            <div class="col-md-12 box-marca">
                <div><img srcset="imagens/artworks/1024-{{$artwork->imagem}}" alt="{{$artwork->title}}" title="{{$artwork->title}}" width="100%"></div>
                <h5>1024px de largura × 398px de altura</h5><br>
                <i class="fa fa-download fa-2x" style="color: #3498DB;" aria-hidden="true"></i><br><br>
                <p><a href="imagens/artworks/1024-{{$artwork->imagem}}" target="_blank">PNG</a> | <a href="imagens/artworks/1024-{{$artworkJpg->imagem}}" target="_blank">JPG</a></p>
            </div>
            <div class="col-md-12">
                <br><hr><br>
            </div>
            <div class="col-md-12 box-marca">
                <div><img srcset="imagens/artworks/2048-{{$artwork->imagem}}" alt="{{$artwork->title}}" title="{{$artwork->title}}" width="100%" ></div>
                <h5>2048px de largura × 796px de altura</h5><br>
                <i class="fa fa-download fa-2x" style="color: #3498DB;" aria-hidden="true"></i><br><br>
                <p><a href="imagens/artworks/2048-{{$artwork->imagem}}" target="_blank">PNG</a> | <a href="imagens/artworks/2048-{{$artworkJpg->imagem}}" target="_blank">JPG</a></p>
            </div>
        </div>
        @endif
        {{--//////////--}}
    </div>
    <div class="tab-pane fade" id="pills-vertical" role="tabpanel" aria-labelledby="pills-vertical-tab">
        {{--//////////--}}
        <br><br><br>
        @if($artworkVert)
        <div class="row">
            <div class="col-md-4 box-marca">
                <div><img srcset="imagens/artworks/72-{{$artworkVert->imagem}}" alt="{{$artworkVert->title}}" title="{{$artworkVert->title}}" ></div>
                <h5>72px de largura × 28px de altura</h5><br>
                <i class="fa fa-download fa-2x" style="color: #3498DB;" aria-hidden="true"></i><br><br>
                <p><a href="imagens/artworks/72-{{$artworkVert->imagem}}" target="_blank">PNG</a> | <a href="imagens/artworks/72-{{$artworkVertJpg->imagem}}" target="_blank">JPG</a></p>
            </div>
            <div class="col-md-4 box-marca">
                <div><img srcset="imagens/artworks/96-{{$artworkVert->imagem}}" alt="{{$artworkVert->title}}" title="{{$artworkVert->title}}" ></div>
                <h5>96px de largura × 37px de altura</h5><br>
                <i class="fa fa-download fa-2x" style="color: #3498DB;" aria-hidden="true"></i><br><br>
                <p><a href="imagens/artworks/72-{{$artworkVert->imagem}}" target="_blank">PNG</a> | <a href="imagens/artworks/96-{{$artworkVertJpg->imagem}}" target="_blank">JPG</a></p>
            </div>
            <div class="col-md-4 box-marca">
                <div><img srcset="imagens/artworks/114-{{$artworkVert->imagem}}" alt="{{$artworkVert->title}}" title="{{$artworkVert->title}}" ></div>
                <h5>114px de largura × 44px de altura</h5><br>
                <i class="fa fa-download fa-2x" style="color: #3498DB;" aria-hidden="true"></i><br><br>
                <p><a href="imagens/artworks/114-{{$artworkVert->imagem}}" target="_blank">PNG</a> | <a href="imagens/artworks/114-{{$artworkVertJpg->imagem}}" target="_blank">JPG</a></p>
            </div>
            <div class="col-md-12">
                <br><hr><br>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4 box-marca">
                <div><img srcset="imagens/artworks/128-{{$artworkVert->imagem}}" alt="{{$artworkVert->title}}" title="{{$artworkVert->title}}" ></div>
                <h5>128px de largura × 50px de altura</h5><br>
                <i class="fa fa-download fa-2x" style="color: #3498DB;" aria-hidden="true"></i><br><br>
                <p><a href="imagens/artworks/128-{{$artworkVert->imagem}}" target="_blank">PNG</a> | <a href="imagens/artworks/128-{{$artworkVertJpg->imagem}}" target="_blank">JPG</a></p>
            </div>
            <div class="col-md-4 box-marca">
                <div><img srcset="imagens/artworks/144-{{$artworkVert->imagem}}" alt="{{$artworkVert->title}}" title="{{$artworkVert->title}}" ></div>
                <h5>144px de largura × 56px de altura</h5><br>
                <i class="fa fa-download fa-2x" style="color: #3498DB;" aria-hidden="true"></i><br><br>
                <p><a href="imagens/artworks/144-{{$artworkVert->imagem}}" target="_blank">PNG</a> | <a href="imagens/artworks/144-{{$artworkVertJpg->imagem}}" target="_blank">JPG</a></p>
            </div>
            <div class="col-md-4 box-marca">
                <div><img srcset="imagens/artworks/256-{{$artworkVert->imagem}}" alt="{{$artworkVert->title}}" title="{{$artworkVert->title}}" ></div>
                <h5>256px de largura × 100px de altura</h5><br>
                <i class="fa fa-download fa-2x" style="color: #3498DB;" aria-hidden="true"></i><br><br>
                <p><a href="imagens/artworks/256-{{$artworkVert->imagem}}" target="_blank">PNG</a> | <a href="imagens/artworks/256-{{$artworkVertJpg->imagem}}" target="_blank">JPG</a></p>
            </div>
            <div class="col-md-12">
                <br><hr><br>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 box-marca">
                <div><img srcset="imagens/artworks/512-{{$artworkVert->imagem}}" alt="{{$artworkVert->title}}" title="{{$artworkVert->title}}" ></div>
                <h5>512x de largura × 199px de altura</h5><br>
                <i class="fa fa-download fa-2x" style="color: #3498DB;" aria-hidden="true"></i><br><br>
                <p><a href="imagens/artworks/512-{{$artworkVert->imagem}}" target="_blank">PNG</a> | <a href="imagens/artworks/512-{{$artworkVertJpg->imagem}}" target="_blank">JPG</a></p>
            </div>
            <div class="col-md-12">
                <br><hr><br>
            </div>
            <div class="col-md-12 box-marca">
                <div><img srcset="imagens/artworks/1024-{{$artworkVert->imagem}}" alt="{{$artworkVert->title}}" title="{{$artworkVert->title}}" width="100%"></div>
                <h5>1024px de largura × 398px de altura</h5><br>
                <i class="fa fa-download fa-2x" style="color: #3498DB;" aria-hidden="true"></i><br><br>
                <p><a href="imagens/artworks/1024-{{$artworkVert->imagem}}" target="_blank">PNG</a> | <a href="imagens/artworks/1024-{{$artworkVertJpg->imagem}}" target="_blank">JPG</a></p>
            </div>
            <div class="col-md-12">
                <br><hr><br>
            </div>
            <div class="col-md-12 box-marca">
                <div><img srcset="imagens/artworks/2048-{{$artworkVert->imagem}}" alt="{{$artworkVert->title}}" title="{{$artworkVert->title}}" width="100%" ></div>
                <h5>2048px de largura × 796px de altura</h5><br>
                <i class="fa fa-download fa-2x" style="color: #3498DB;" aria-hidden="true"></i><br><br>
                <p><a href="imagens/artworks/2048-{{$artworkVert->imagem}}" target="_blank">PNG</a> | <a href="imagens/artworks/2048-{{$artworkVertJpg->imagem}}" target="_blank">JPG</a></p>
            </div>
        </div>
        @endif
        {{--//////////--}}
    </div>
    <div class="tab-pane fade" id="pills-impressao" role="tabpanel" aria-labelledby="pills-impressao-tab">
        <div class="row">
            @foreach($printings as $printing)
                <br><br>
                <div class="col-md-6 text-center">
                    <img srcset="imagens/printings/md-{{$printing->imagem}}" alt="{{$printing->title}}" title="{{$printing->title}}" width="100%" >
                    <h3>{{$printing->title}}</h3><br>
                    <a href="arquivos/printings/{{$printing->arquivo}}">
                        <i class="fa fa-download fa-2x" style="color: #3498DB;" aria-hidden="true"></i><br>Download<br>
                    </a>
                    <br>
                </div>
            @endforeach
        </div>
    </div>
    <div class="tab-pane fade" id="pills-manual" role="tabpanel" aria-labelledby="pills-manual-tab">
        @if($printingsManual)
            <iframe src="arquivos/printings/{{$printingsManual->arquivo}}" height="1000px" width="100%" frameborder="0"></iframe>
        @endif
    </div>
</div>


