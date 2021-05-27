<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('imagem');
            $table->string('email');
            $table->string('titulo');
            $table->string('rodape');
            $table->string('cep');
            $table->string('endereco');
            $table->string('numero');
            $table->string('complemento')->nullable();
            $table->string('bairro');
            $table->string('cidade');
            $table->string('estado');
            $table->string('titulo_contato');
            $table->string('descricao_contato');
            $table->string('telefone');
            $table->string('telefone2')->nullable();
            $table->string('telefone3')->nullable();
            $table->string('facebook');
            $table->string('youtube');
            $table->string('pinterest');
            $table->string('twitter');
            $table->string('instagram');
            $table->string('blog');
            $table->integer('cmsuser_id')->unsigned();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('settings');
    }
}
