@extends('layout')
@section('title', 'Seja Bem Vindo')


@section('content')
    <div class="container">
      <section>
          <i class="fas fa-5x fa-user"></i>
          <figure>
              <img src="https://www.w3schools.com/html/pic_trulli.jpg" alt="Trulli" title="" >
              <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption>
          </figure>

          <div class="row">
              <div class="col-md-4">
                  <div class="img-box">
                      <img data-src="holder.js/200x200" class="img-fluid img-hover" alt="200x200" src="https://www.w3schools.com/html/pic_trulli.jpg" data-holder-rendered="true">
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

          <div id="like_button_container"></div>

      </section>
    </div>

    <style>
        .img-box{
        }
        .img-rede{
            display: none;
        }
        .img-hover{
            transition: .4s;
        }
        .img-hover:hover{
            filter: brightness(50%);
            transition: .4s;
        }
        .img-box:hover .img-rede {
            display: block;
            position: absolute;
            top: 20%;
            text-align: center;
            left: 43%;
            margin: 0 -15px;
        }
        .img-rede svg{
            margin: 0 5px;
            font-size: 25px;
            left: 200px;
            color: #FFFFFF;
        }
        .img-rede svg:hover{
            color: #1b4b72;
        }

        h2{
            font-size: 1.5rem;
            line-height: 1.3;
            letter-spacing: .03em;
            font-weight: bold;
        }
        p{
            font-family: opensans-regular,Arial,Helvetica Neue,Helvetica,sans-serif;
            font-size: 1rem;
            line-height: 1.25;
            letter-spacing: .035em;
        }
        h5{
            font-size: 0.9rem;
            color: #949494;
        }
        h4{
            font-size: 1rem;
            line-height: 30px;
        }
        .btn-plus{
            color: #3f9ae5;
            text-decoration: underline;
        }

    </style>



@endsection
