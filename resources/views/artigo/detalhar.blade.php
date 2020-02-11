@extends('layout')
@section('title', '')
@section('keywords', '')
@section('description', '')
@section('image', '')
@section('content')

    <?php
        $plural = "Artigos";
        $singular = "Artigo";
    ?>

    <div class="bg-lgt">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <header>
                        <br>
                        <h1>{{$plural}}</h1>
                        <h5><a href="">Home</a> / <a href="">{{$plural}}</a> / Lorem Ipsum is simply dummy...</h5>
                        <br>
                    </header>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-8">
                <article>
                    <br>


                    <picture>
                        <source srcset="https://www.w3schools.com/html/pic_trulli.jpg" media="(max-width: 468px)">
                        <source srcset="https://www.w3schools.com/html/pic_trulli.jpg" media="(max-width: 768px)">
                        <source srcset="https://www.w3schools.com/html/pic_trulli.jpg" class="img-responsive">
                        <img src="img/loading.gif" data-src="https://www.w3schools.com/html/pic_trulli.jpg" alt="Imagem sobre " title="Imagem sobre " width="100%" class="img-fluid img-hover lazyload">
                        <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption>
                    </picture>

                    <div class="row">
                        <div class="col-md-6 item-calendar">
                            <h5><i class="fas fa-calendar"></i> 25 fev 2020</h5>
                        </div>
                        <div class="col-md-6 text-right fa-svg">
                            <i class="fab fa-facebook-f"></i>
                            <i class="fab fa-instagram"></i>
                            <i class="fab fa-twitter"></i>
                            <i class="fab fa-whatsapp"></i>
                        </div>
                    </div>
                    <h2>Lorem Ipsum is simply dummy text of the printing and typesetting industry</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam commodo facilisis elit, eu mattis nunc iaculis vel. Duis ac dolor velit. Donec id massa enim. Sed maximus ipsum ut neque tristique, a ultricies orci ornare. Mauris eget purus vel leo pulvinar sodales sodales in neque. Aenean efficitur ligula in mauris ullamcorper, venenatis dapibus est laoreet. Vivamus rutrum purus ante, vel ultrices ipsum porta gravida. Duis vulputate nulla in erat consequat lobortis. In sit amet leo at orci interdum placerat eu vel est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam augue tellus, egestas eu feugiat a, cursus vitae dolor.
                        <br>
                        <br>

                        Nam pulvinar dui lorem, non fringilla enim finibus ut. Sed et pharetra odio, eu euismod erat. Aenean eu mi nec sem tempor vestibulum. Duis eu justo id nisl venenatis venenatis sit amet quis nunc. Donec maximus, tortor eget vestibulum lobortis, ex nisl volutpat nunc, ut mattis nisl lacus non massa. Quisque ut ex diam. Phasellus et congue leo, et ullamcorper nulla. In fermentum consectetur aliquam. Mauris ac auctor odio. Cras gravida ex ut blandit luctus. Donec quis porta mi, eget scelerisque ipsum. Sed enim justo, consectetur ut ex condimentum, dictum interdum augue.
                        <br>
                        <br>
                        Phasellus vulputate quis quam eu vehicula. Ut suscipit, lacus eget sagittis ullamcorper, mi est elementum libero, quis posuere ex libero vitae nulla. Aliquam erat volutpat. Ut vitae quam nec massa volutpat interdum quis at eros. Donec mollis, ligula nec consectetur dapibus, nulla enim blandit turpis, a luctus ipsum augue id nibh. Pellentesque at suscipit nunc. Pellentesque lectus metus, placerat nec porttitor vel, rhoncus id lorem. Integer placerat leo nec placerat tincidunt. In ullamcorper rhoncus massa, quis vestibulum odio vestibulum vel.
                        <br>
                        <br>
                        Vestibulum faucibus placerat facilisis. Quisque sed tempor augue, non suscipit ipsum. Vestibulum in arcu mauris. Ut enim sem, pulvinar at lacus rhoncus, euismod porta quam. Nullam dictum porta urna, in venenatis dui lobortis gravida. Phasellus at sapien at metus accumsan venenatis. Sed scelerisque purus dui, sed vulputate purus placerat id.
                        <br>
                        <br>
                        Nulla sit amet sollicitudin orci. Nullam lacinia iaculis dui, eget lacinia erat accumsan dignissim. Ut ut accumsan sapien, quis sagittis risus. Vivamus metus nunc, aliquam sit amet tempor eu, maximus id nunc. Suspendisse potenti. Sed tortor magna, rutrum in diam ut, hendrerit condimentum orci. Nulla mattis justo ornare nisi elementum congue. Nulla volutpat vitae mauris non laoreet. Duis mollis ullamcorper urna, vitae eleifend orci. Nam gravida commodo orci in aliquet. Etiam ut mi pulvinar, mollis lectus ut, laoreet augue. Aenean mollis lectus arcu, rhoncus vestibulum mauris facilisis a. Cras fermentum justo et sapien pretium commodo. Aliquam ut nibh id nulla feugiat gravida. Nunc pretium urna laoreet lacus auctor, eget elementum sem pulvinar. Ut lobortis urna nec lacus feugiat, vel ultrices libero semper.</p>
                    <br>
                    <hr>
                </article>

                <div class="row">
                    <div class="col-md-6">
                        <div><input type="text" placeholder="Nome" class="form-control"></div>
                        <br>
                    </div>
                    <div class="col-md-6">
                        <div><input type="email" placeholder="E-mail" class="form-control"></div>
                        <br>
                    </div>
                    <div class="col-md-12">
                        <div><textarea class="form-control" ></textarea></div>
                        <br>
                    </div>
                    <div class="col-md-3">
                        <div>
                            <button class="btn btn-primary" >Enviar</button>
                        </div>
                    </div>
                </div>

                <div class="space"></div>
                <div class="row">
                    <div class="col-md-12">
                        <h2>Comentários</h2>
                        <br>
                    </div>
                    <div class="col-md-12">
                        <div>
                            <img src="http://www.jardindemeriem.com/images/temoin/2.jpg" alt="" class="rounded-circle float-left" width="60">
                            <div class="row">
                                <div class="col-md-6 text-left">
                                    <h4>Ricardo Pereira</h4>
                                </div>
                                <div class="col-md-6 text-right item-calendar">
                                    <h5><i class="fas fa-calendar"></i> 25 fev 2020</h5>
                                </div>
                                <div class="col-md-12">
                                    <p><strong class="aspa">"</strong>Nulla sit amet sollicitudin orci. Nullam lacinia iaculis dui, eget lacinia erat accumsan dignissim. Ut ut accumsan sapien, quis sagittis risus. Vivamus metus nunc, aliquam sit amet tempor eu, maximus id nunc. Suspendisse potenti.<strong class="aspa">"</strong></p>
                                </div>
                            </div>
                            <hr>
                        </div>
                    </div>
                </div>


                <div class="space">
                    <div class="row">
                        <div class="col-md-6 text-left">
                            <div><i class="fas fa-angle-left"></i> {{$singular}} anterior</div>
                        </div>
                        <div class="col-md-6 text-right">
                            <div>Próximo {{$singular}} <i class="fas fa-angle-right"></i></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div>
                    <br>
                    <div class="line-color"></div>
                    <h2><i class="far fa-clock"></i> Recentes</h2>
                    <div>
                        <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry</h3>
                        <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                        <h4 class="btn-plus">Continue lendo</h4>
                        <hr>
                    </div>
                    <div>
                        <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry</h3>
                        <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                        <h4 class="btn-plus">Continue lendo</h4>
                        <hr>
                    </div>
                    <div>
                        <h3>Lorem Ipsum is simply dummy text of the printing and typesetting industry</h3>
                        <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                        <h4 class="btn-plus">Continue lendo</h4>
                        <hr>
                    </div>
                </div>
                <div class="float-none">
                    <br><br>
                    <div class="line-color"></div>
                    <h2><i class="far fa-user"></i> Autores do {{$singular}}</h2>
                    <hr>
                    <div class="list-user">
                        <img src="http://www.jardindemeriem.com/images/temoin/2.jpg" alt="" class="rounded-circle float-left" width="60">
                        <h4>Fernando Lima</h4>
                        <p>Diretor</p>
                        <hr>
                    </div>
                    <div class="list-user">
                        <h4>Ricardo Costa</h4>
                        <p>Diretor</p>
                        <hr>
                    </div>
                    <div class="list-user">
                        <img src="http://www.jardindemeriem.com/images/temoin/2.jpg" alt="" class="rounded-circle float-left" width="60">
                        <h4>Dezembro de 2019</h4>
                        <p>Diretor</p>
                        <hr>
                    </div>
                </div>
            </div>
        </div>

    </div>


@endsection
