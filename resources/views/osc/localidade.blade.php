@extends('layout')
@section('title', '')
@section('keywords', '')
@section('description', '')
@section('image', '')
@section('content')

    <script>
        origem = <?php echo $origem;?>;
    </script>

   <div id="perfil"></div>


    <style>
        .box-itens-hover{
            background-color: #EEEEEE;
        }
        .box-itens-hover:hover{
            background-color: #3A559B;
            color: #FFFFFF;
        }
        .box-itens-hover h2{
            font-size: 20px;
            font-weight: bold;
        }
        .box-itens-hover h3{
            font-size: 17px;
        }
        .apexcharts-xaxis-label{
            width: 100px;
            max-width: 100px;
        }
    </style>

@endsection
