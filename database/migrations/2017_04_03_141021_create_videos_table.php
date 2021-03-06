<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVideosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('videos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('titulo')->nullable();
            $table->string('link_video')->nullable();
            $table->date('data')->nullable();
            $table->text('resumida')->default('');
            $table->text('descricao')->default('');
            $table->string('imagem')->default('');
            $table->integer('status')->default(0);
            //$table->integer('idioma_id')->unsigned();
            //$table->foreign('idioma_id')->references('id')->on('idiomas')->onDelete('restrict');
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
        Schema::drop('videos');
    }
}
