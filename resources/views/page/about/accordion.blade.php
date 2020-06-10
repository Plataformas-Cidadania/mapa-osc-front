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
                        <div class="col-md-4 text-center btn-file">
                            <br><br>
                            <i class="far fa-file-pdf fa-4x"></i><br><br>
                            Baixar o Tutorial em PDF
                        </div>
                    </div>
                    @endif
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
        background-color: #e3342f;
        color: #FFFFFF;
    }
</style>
