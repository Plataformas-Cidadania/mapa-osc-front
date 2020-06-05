<div class="accordion" id="accordionExample">
    @foreach($items as $key => $item)
        <div class="card">
            <div class="card-header" id="item-{{$key}}">
                <div class="mb-0" data-toggle="collapse" data-target="#collapse{{$key}}" aria-expanded="true" aria-controls="collapse{{$key}}">
                    {{$item->titulo}} <i class="fas fa-angle-down float-right"></i>
                </div>
            </div>

            <div id="collapse{{$key}}" class="collapse @if($key==0 || $show==1) show @endif" aria-labelledby="heading{{$key}}" data-parent="#accordionExample">
                <div class="card-body">
                    {!! $item->descricao !!}
                </div>
            </div>
        </div>
    @endforeach
</div>
