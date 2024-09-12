<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChartCategoriaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chart_categorias', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('imagem')->nullable();
            $table->string('titulo')->nullable();
            $table->text('descricao')->nullable();
            $table->text('arquivo')->nullable();
            $table->integer('posicao')->default(0);
            $table->integer('status')->default(0);
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
        Schema::dropIfExists('chart_categorias');
    }
}
