{{--É NECESSÁRIO RODAR O COMANDO composer require illuminate/html E ALTERAR ACRESCENTAR LINHA NO ARQUIVO config/app.php--}}
{!! Form::label('titulo', 'Nome') !!}<br>
{!! Form::text('titulo', null, ['class'=>"form-control width-grande <% validar(setting.titulo) %>", 'ng-model'=>'setting.titulo', 'ng-required'=>'true', 'init-model'=>'setting.titulo']) !!}<br>

{!! Form::label('email', 'E-mail') !!}<br>
{!! Form::text('email', null, ['class'=>"form-control width-grande <% validar(setting.email) %>", 'ng-model'=>'setting.email', 'ng-required'=>'true', 'init-model'=>'setting.email']) !!}<br>

{!! Form::label('descricao_contato', 'Informação contato') !!}<br>
{!! Form::text('descricao_contato', null, ['class'=>"form-control width-grande <% validar(setting.descricao_contato) %>", 'ng-model'=>'setting.descricao_contato', 'ng-required'=>'true', 'init-model'=>'setting.descricao_contato']) !!}<br>

{!! Form::label('rodape', 'Rodapé') !!}<br>
{!! Form::text('rodape', null, ['class'=>"form-control width-grande <% validar(setting.rodape) %>", 'ng-model'=>'setting.rodape', 'ng-required'=>'true', 'init-model'=>'setting.rodape']) !!}<br>
<!-- ///// -->

<h2>Endereço 1</h2>
{!! Form::label('endereco_tutulo', 'Título') !!}<br>
{!! Form::text('endereco_tutulo', null, ['class'=>"form-control width-grande <% validar(setting.endereco_tutulo) %>", 'ng-model'=>'setting.endereco_tutulo', 'ng-required'=>'true', 'init-model'=>'setting.endereco_tutulo']) !!}<br>

<div class="row">
    <div class="col-md-5">
        {!! Form::label('endereco', 'Endereço') !!}<br>
        {!! Form::text('endereco', null, ['class'=>"form-control width-grande <% validar(setting.endereco) %>", 'ng-model'=>'setting.endereco', 'ng-required'=>'true', 'init-model'=>'setting.endereco']) !!}<br>
    </div>
    <div class="col-md-2">
        {!! Form::label('numero', 'Numero') !!}<br>
        {!! Form::text('numero', null, ['class'=>"form-control width-grande <% validar(setting.numero) %>", 'ng-model'=>'setting.numero', 'ng-required'=>'true', 'init-model'=>'setting.numero']) !!}<br>
    </div>
</div>

{!! Form::label('complemento', 'Complemento') !!}<br>
{!! Form::text('complemento', null, ['class'=>"form-control width-grande <% validar(setting.complemento) %>", 'ng-model'=>'setting.complemento', 'ng-required'=>'true', 'init-model'=>'setting.complemento']) !!}<br>

{!! Form::label('bairro', 'Bairro') !!}<br>
{!! Form::text('bairro', null, ['class'=>"form-control width-grande <% validar(setting.bairro) %>", 'ng-model'=>'setting.bairro', 'ng-required'=>'true', 'init-model'=>'setting.bairro']) !!}<br>

{!! Form::label('cidade', 'Cidade') !!}<br>
{!! Form::text('cidade', null, ['class'=>"form-control width-grande <% validar(setting.cidade) %>", 'ng-model'=>'setting.cidade', 'ng-required'=>'true', 'init-model'=>'setting.cidade']) !!}<br>

{!! Form::label('estado', 'Estado') !!}<br>
{!! Form::text('estado', null, ['class'=>"form-control width-grande <% validar(setting.estado) %>", 'ng-model'=>'setting.estado', 'ng-required'=>'true', 'init-model'=>'setting.estado']) !!}<br>

{!! Form::label('cep', 'CEP.') !!}<br>
{!! Form::text('cep', null, ['class'=>"form-control width-grande <% validar(setting.cep) %>", 'ng-model'=>'setting.cep', 'ng-required'=>'true', 'init-model'=>'setting.cep']) !!}<br>

{!! Form::label('telefone', 'Telefone') !!}<br>
{!! Form::text('telefone', null, ['class'=>"form-control width-grande <% validar(setting.telefone) %>", 'ng-model'=>'setting.telefone', 'ng-required'=>'true', 'init-model'=>'setting.telefone']) !!}<br>

<!-- ///// -->

<h2>Endereço 2</h2>
{!! Form::label('endereco_tutulo2', 'Título') !!}<br>
{!! Form::text('endereco_tutulo2', null, ['class'=>"form-control width-grande <% validar(setting.endereco_tutulo2) %>", 'ng-model'=>'setting.endereco_tutulo2', 'ng-required'=>'true', 'init-model'=>'setting.endereco_tutulo2']) !!}<br>

<div class="row">
    <div class="col-md-5">
        {!! Form::label('endereco2', 'Endereço') !!}<br>
        {!! Form::text('endereco2', null, ['class'=>"form-control width-grande <% validar(setting.endereco2) %>", 'ng-model'=>'setting.endereco2', 'ng-required'=>'true', 'init-model'=>'setting.endereco2']) !!}<br>
    </div>
    <div class="col-md-2">
        {!! Form::label('numero2', 'Numero') !!}<br>
        {!! Form::text('numero2', null, ['class'=>"form-control width-grande <% validar(setting.numero2) %>", 'ng-model'=>'setting.numero2', 'ng-required'=>'true', 'init-model'=>'setting.numero2']) !!}<br>
    </div>
</div>
{!! Form::label('complemento2', 'Complemento') !!}<br>
{!! Form::text('complemento2', null, ['class'=>"form-control width-grande <% validar(setting.complemento2) %>", 'ng-model'=>'setting.complemento2', 'ng-required'=>'true', 'init-model'=>'setting.complemento2']) !!}<br>

{!! Form::label('bairro2', 'Bairro') !!}<br>
{!! Form::text('bairro2', null, ['class'=>"form-control width-grande <% validar(setting.bairro2) %>", 'ng-model'=>'setting.bairro2', 'ng-required'=>'true', 'init-model'=>'setting.bairro2']) !!}<br>

{!! Form::label('cidade2', 'Cidade') !!}<br>
{!! Form::text('cidade2', null, ['class'=>"form-control width-grande <% validar(setting.cidade2) %>", 'ng-model'=>'setting.cidade2', 'ng-required'=>'true', 'init-model'=>'setting.cidade2']) !!}<br>

{!! Form::label('estado2', 'Estado') !!}<br>
{!! Form::text('estado2', null, ['class'=>"form-control width-grande <% validar(setting.estado2) %>", 'ng-model'=>'setting.estado2', 'ng-required'=>'true', 'init-model'=>'setting.estado2']) !!}<br>

{!! Form::label('cep2', 'CEP.') !!}<br>
{!! Form::text('cep2', null, ['class'=>"form-control width-grande <% validar(setting.cep2) %>", 'ng-model'=>'setting.cep2', 'ng-required'=>'true', 'init-model'=>'setting.cep2']) !!}<br>


{!! Form::label('telefone2', 'Telefone') !!}<br>
{!! Form::text('telefone2', null, ['class'=>"form-control width-grande <% validar(setting.telefone2) %>", 'ng-model'=>'setting.telefone2', 'ng-required'=>'true', 'init-model'=>'setting.telefone2']) !!}<br>

<!-- ///// -->


<h2>Redes</h2>

{!! Form::label('facebook', 'Facebook') !!}<br>
{!! Form::text('facebook', null, ['class'=>"form-control width-grande <% validar(setting.facebook) %>", 'ng-model'=>'setting.facebook', 'ng-required'=>'true', 'init-model'=>'setting.facebook']) !!}<br>

{!! Form::label('youtube', 'Youtube') !!}<br>
{!! Form::text('youtube', null, ['class'=>"form-control width-grande <% validar(setting.youtube) %>", 'ng-model'=>'setting.youtube', 'ng-required'=>'true', 'init-model'=>'setting.youtube']) !!}<br>

{!! Form::label('pinterest', 'Pinterest') !!}<br>
{!! Form::text('pinterest', null, ['class'=>"form-control width-grande <% validar(setting.pinterest) %>", 'ng-model'=>'setting.pinterest', 'ng-required'=>'true', 'init-model'=>'setting.pinterest']) !!}<br>

{!! Form::label('twitter', 'Twitter') !!}<br>
{!! Form::text('twitter', null, ['class'=>"form-control width-grande <% validar(setting.twitter) %>", 'ng-model'=>'setting.twitter', 'ng-required'=>'true', 'init-model'=>'setting.twitter']) !!}<br>

{!! Form::label('blog', 'Blog') !!}<br>
{!! Form::text('blog', null, ['class'=>"form-control width-grande <% validar(setting.blog) %>", 'ng-model'=>'setting.blog', 'ng-required'=>'true', 'init-model'=>'setting.blog']) !!}<br>

{!! Form::label('instagram', 'Instagram') !!}<br>
{!! Form::text('instagram', null, ['class'=>"form-control width-grande <% validar(setting.instagram) %>", 'ng-model'=>'setting.instagram', 'ng-required'=>'true', 'init-model'=>'setting.instagram']) !!}<br>

