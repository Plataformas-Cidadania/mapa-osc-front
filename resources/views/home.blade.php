@extends('layout')
@section('title', 'Seja Bem Vindo')


@section('content')
  <section>
      <i class="fas fa-5x fa-user"></i>
      <figure>
          <img src="https://www.w3schools.com/html/pic_trulli.jpg" alt="Trulli" title="" >
          <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption>
      </figure>

      <div class="row">
          <div class="col-md-3">1</div>
          <div class="col-md-3">2</div>
          <div class="col-md-3">3</div>
      </div>

      <div id="like_button_container"></div>

  </section>

@endsection
