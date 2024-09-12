<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('charts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('imagem');
            $table->string('titulo');
            $table->text('descricao')->nullable();
            $table->string('fonte')->nullable();
            $table->string('tipo')->nullable();
            $table->string('slug')->nullable();
            $table->string('grupo_id')->default(0);
            $table->integer('chart_categoria_id')->default(0);
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
        Schema::dropIfExists('charts');
    }
}
