@extends('layout')
@section('content')

    <?php $rota = Route::getCurrentRoute()->uri();
    $text = \App\Text::where('slug', 'sancoes-legais')->first();
    $termo = DB::table("portal.tb_termo")->orderBy('id_termo', 'desc')->first();
?>
    <script>
        maxAddresses = 10;
        maxCertificates = 200;
        maxGovernancas = 200;
        maxConselhos = 200;
        maxAtuacoes = 200;
        maxParticipacoes = 200;
        maxRecursos = 200;
        maxProjetos = 200;
        text = <?php echo $text;?>;

        /*window.onload = function () {
            openModal();
        };*/
    </script>

    <div>
        {{--<button class="open-btn" onclick="openModal()">Abrir Modal</button>--}}

        <!-- Modal -->
        {{--<div class="modal-overlay" id="modal">
            <div class="modal-content">
                --}}{{--<button class="close-btn" onclick="closeModal()">&times;</button>--}}{{--
                <h2>Termo</h2>
                <p>{{$termo->tx_nome}}</p>
                <button class="open-btn" onclick="closeModal()">Aceitar termo</button>
            </div>
        </div>

        <script>
            function openModal() {
                document.getElementById('modal').style.display = 'flex';
            }

            function closeModal() {
                document.getElementById('modal').style.display = 'none';
            }
        </script>--}}

    </div>

    <div id="header"></div>
    <br><br>
    <div class="container">
        <div id="header-user"></div>
        <div class="row">
            @if($rota!="selo-osc-user/{id_osc}")
                <div class="col-md-3">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <div id="menu"></div>
                        </div>
                    </div>
                </div>
            @else
                <div class="col-md-3 text-center">
                    <div style="border: solid 1px #F1F1F1; border-radius: 5px; padding: 15px;">
                        <img src='{{env('APP_URL')}}img/logo.png' width="100%"/>
                        <br><br>
                        Página validação da OSC:<br>
                        <a href="{{env('APP_URL')}}selo-osc/{{$id_osc}}" class="btn btn-outline-primary">Acesse aqui</a>
                    </div>

                </div>
            @endif


            <div class="col-md-9">
                <div class="panel panel-default">
                    <div class="panel-body" id="content-react">

                    </div>
                    <script>
                        let token = localStorage.getItem('@App:token');
                        if(token){
                            let divReact = document.createElement('div');
                            divReact.id = "{{$pgUserArea}}";
                            let contentReact = document.getElementById('content-react');
                            console.log(contentReact);
                            contentReact.appendChild(divReact);
                        }
                    </script>
                </div>
            </div>
        </div>
    </div>
    <br><br>
    <div id="footer"></div>
    <style>
        .label-float label {
            top: calc(48% - 28px);
        }
    </style>
    <style>
       /* Estilo do fundo escurecido */
        .modal-overlay {
            display: none; /* Escondido por padrão */
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        /* Estilo do conteúdo do modal */
        .modal-content {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            max-width: 700px;
            width: 80%;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            position: relative;
        }

        /* Botão de fechar */
        .close-btn {
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #333;
        }

        .open-btn {
            margin-top: 50px;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            background-color: #3a559b;
            color: #FFFFFF;
            border: 0;
        }

       .open-btn-sus {
           margin-top: 50px;
           padding: 10px 20px;
           font-size: 16px;
           cursor: pointer;
           background-color: #0d9e03;
           color: #FFFFFF;
           border: 0;
       }
        .d-flex{
            display: flex;
        }
    </style>
@endsection
