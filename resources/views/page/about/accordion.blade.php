@php use Illuminate\Support\Facades\Schema; @endphp
<div class="accordion" id="accordionExample">


    @foreach($items as $key => $item)

        <div class="card">
            <div class="card-header" id="item-{{$key}}">
                <div class="mb-0" data-toggle="collapse" @if($page->show==0) data-target="#collapse{{$key}}" @endif aria-expanded="true" aria-controls="collapse{{$key}}">
                    {{$item->titulo}} <i class="fas fa-angle-down float-right" @if($page->show>0) style="display: none;" @endif></i>
                </div>
            </div>

            <div id="collapse{{$key}}" class="collapse @if($key==0 || $show==1) show @endif" aria-labelledby="heading{{$key}}" data-parent="#accordionExample">
                <div class="card-body">
                    {!! $item->descricao !!}
                    @if($item->video!="")
                        <div class="row">
                            <div class="col-md-8">
                                <iframe width="100%" height="300" src="https://www.youtube.com/embed/{{substr($item->video, 32, 11)}}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </div>
                    @endif

                    @if($item->arquivo!="")
                        <a href="arquivos/items/{{$item->arquivo}}" class="col-md-5 text-center btn-file" target="_blank" style="vertical-align: middle">
                            <i class="far fa-file-pdf fa-2x" style="padding-top: 10px;"></i>
                            Baixar o arquivo em PDF
                        </a>
                    @endif

                        <?php
                            if (Schema::hasTable('subitems')) {
                                $subitems = \App\Subitem::where('item_id', $item->id)
                                    ->where('status', 1)
                                    ->orderBy('posicao')
                                    ->get();
                            } else {
                                $subitems = collect();
                            }
                        ?>
                        @if(isset($subitems) && $subitems->isNotEmpty())
                            @foreach($subitems as $subitem)
                                <?php
                                    $path = public_path($subitem->url!= "" ? $subitem->url : 'arquivos/subitems/' . $subitem->arquivo);
                                    if (file_exists($path)) {
                                        $subitem->file_size = filesize($path);
                                        $subitem->file_extension = pathinfo($path, PATHINFO_EXTENSION);
                                    } else {
                                        $subitem->file_size = 0; // ou null se preferir
                                        $subitem->file_extension = 'N/A';
                                    }
                                ?>

                                <p style="padding-top: 20px">
                                    <a href="{{$subitem->url!= "" ? $subitem->url : 'arquivos/subitems/' . $subitem->arquivo}}" class="col-md-5 text-center btn-file" target="_blank" style="vertical-align: middle;">
                                        <i class="far fa-file fa-2x" style="padding-top: 10px;"></i>
                                        {{$subitem->titulo}}
                                        Atualizado em: {{formatBr($subitem->updated_at, 'num')}}
                                        @if($subitem->file_size > 0)
                                            <span> ({{ strtoupper($subitem->file_extension) }} - {{ round($subitem->file_size / 1024, 2) }} KB)</span>
                                        @else
                                            <span> (Informações indisponíveis)</span>
                                        @endif
                                    </a>
                                </p>


                            @endforeach
                       @endif




                    <br><br>
                </div>
            </div>
        </div>
    @endforeach
</div>
<style>
    .btn-file{
        background-color: #EEEEEE;
        border-radius: 5px;
        padding: 20px;
    }
    .btn-file:hover{
        background-color: #3A559B ;
        color: #FFFFFF;
    }
</style>
