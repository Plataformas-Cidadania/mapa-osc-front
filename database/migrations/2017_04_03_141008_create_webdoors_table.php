<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWebdoorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('webdoors', function (Blueprint $table) {
            $table->increments('id');
            $table->string('imagem');
            $table->string('titulo')->nullable();
            $table->text('descricao')->nullable();
            $table->text('link')->nullable();
            $table->string('legenda')->nullable();
            $table->integer('posicao')->default(0);
            $table->integer('status')->default(0);
            $table->integer('cmsuser_id')->unsigned();
            $table->foreign('cmsuser_id')->references('id')->on('cms_users')->onDelete('restrict');
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
        Schema::drop('webdoors');
    }
}
