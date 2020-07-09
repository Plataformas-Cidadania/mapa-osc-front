@foreach($items as $item)
    <br>
    <h2>{{$item->titulo}}</h2>
    <hr>
    <p>{!! $item->descricao !!}</p>
@endforeach
