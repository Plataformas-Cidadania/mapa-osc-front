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
                      <img srcset="https://www.w3schools.com/html/pic_trulli.jpg" alt="Imagem sobre " title="Imagem sobre " width="100%" class="img-fluid img-hover">
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
@endsection
