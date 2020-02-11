@extends('layout')
@section('title', 'Seja Bem Vindo')


@section('content')

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<div class="container">
    <section>
      <div class="row">
          <div class="col-md-4">
              <div class="img-box">
                  <picture>
                      <source srcset="https://www.w3schools.com/html/pic_trulli.jpg" media="(max-width: 468px)">
                      <source srcset="https://www.w3schools.com/html/pic_trulli.jpg" media="(max-width: 768px)">
                      <source srcset="https://www.w3schools.com/html/pic_trulli.jpg" class="img-responsive">
                      <img src="img/loading.gif" data-src="https://www.w3schools.com/html/pic_trulli.jpg" alt="Imagem sobre " title="Imagem sobre " width="100%" class="img-fluid img-hover lazyload">
                  </picture>
                  <div class="img-rede">
                      <i class="fab fa-facebook-f"></i>
                      <i class="fab fa-instagram"></i>
                      <i class="fab fa-twitter"></i>
                  </div>
              </div>
              <br>
              <h5><i class="fas fa-calendar"></i> 25 fev 2020</h5>
              <h2>Lorem Ipsum is simply dummy text of the printing and typesetting industry</h2>
              <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
              <h4 class="btn-plus">Continue lendo</h4>
          </div>
          <div class="col-md-3">2</div>
          <div class="col-md-3">3</div>
      </div>
    </section>

    <div class="row">
        <div class="col-md-12">
            <div class="circle">
                <div id="a" class="rotate">
                    <div class="circle-item">A</div>
                </div>
                <div id="b" class="rotate">
                    <div class="circle-item">B</div>
                </div>
                <div id="c" class="rotate">
                    <div class="circle-item">C</div>
                </div>
                <div id="d" class="rotate">
                    <div class="circle-item">D</div>
                </div>
                <div id="e" class="rotate">
                    <div class="circle-item">E</div>
                </div>
            </div>
            <div class="circle2">
                <div id="f" class="rotate2">
                    <div class="circle-item">F</div>
                </div>
            </div>
        </div>
    </div>

    <div class="space">
        <div id="chart"></div>


        <!-- Large modal -->
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Large modal</button>
        <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>


    <style>
        .circle {
            height: 450px;
            width: 450px;
            border-radius: 100%;
            border: solid 1px;
            margin:  auto;
            position: relative;
        }

        .circle2 {
            height: 300px;
            width: 300px;
            border-radius: 100%;
            border: solid 1px;
            margin: -380px  auto 380px auto;
            position: relative;

        }

        .rotate {
            height: 60%;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 10vh;
            margin-left: -50px;
            display: flex;
            align-items: flex-end;
        }

        .rotate2 {
            height: 60%;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 10vh;
            margin-left: -50px;
            display: flex;
            align-items: flex-end;
        }

        .rotate div {
            border-radius: 100%;
            border: solid 1px;
            height: 10vh;
            width: 10vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0095FF;
        }

        .rotate2 div {
            border-radius: 100%;
            border: solid 1px;
            height: 10vh;
            width: 10vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #0095FF;
        }

        #a, #a div,#b, #b div, #c, #c div, #d, #d div, #e, #e div , #f, #f div {
            transition: 1s;
        }

        #a, #b, #c, #d, #e , #f {
            transform-origin: 50px 0;
        }

        #a {
            z-index: 1;
        }

        .circle-item {
            cursor: pointer
        }

        .circle #b {
            transform: rotate(0deg);
        }

        .circle #b div {
            transform: rotate(-0deg);
        }

        .circle #c {
            transform: rotate(-180deg);/*Rotaciona no eixo*/
        }

        .circle #c div {
            transform: rotate(180deg);/*Coloca virado para cima*/
        }

        .circle #d {
            transform: rotate(300deg);
        }

        .circle #d div {
            transform: rotate(60deg);
        }

        .circle #e {
            transform: rotate(60deg);
        }

        .circle #e div {
            transform: rotate(-60deg);
        }

        .circle #a {
            transform: rotate(30deg);
        }

        .circle #a div {
            transform: rotate(-30deg);
        }

        .circle2 #f {
            transform: rotate(30deg); /*Rotaciona no eixo*/
        }

        .circle2 #f div {
            transform: rotate(-30deg); /*Coloca virado para cima*/
        }

    </style>
@endsection


