<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubitemTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subitems', function (Blueprint $table) {
            $table->increments('id');
            $table->string('imagem');
            $table->string('titulo');
            $table->text('descricao');
            $table->text('arquivo');
            $table->integer('posicao')->default(0);
            $table->integer('status')->default(0);
            $table->string('video')->nullable();
            $table->string('url')->nullable();
            $table->integer('item_id')->unsigned();
            $table->integer('cmsuser_id')->unsigned();
            //$table->foreign('cmsuser_id')->references('id')->on('cms_users')->onDelete('restrict');
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
        Schema::dropIfExists('subitems');
    }
}
