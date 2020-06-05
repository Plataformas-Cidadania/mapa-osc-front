<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAnalysisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        //RASCUNHOS
        Schema::create('dft_analysis', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->dateTime('date')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->string('hash')->nullable();
            $table->string('archived')->default(0);
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('restrict');
            $table->timestamps();
        });

        //IDIOMAS RASCUNHOS
        Schema::create('lng_dft_analysis', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title')->nullable();
            $table->string('teaser')->nullable();
            $table->text('description')->nullable();
            $table->string('lang', 6)->nullable();
            $table->bigInteger('draft_id')->unsigned();
            $table->foreign('draft_id')->references('id')->on('dft_analysis')->onDelete('cascade');
            $table->timestamps();
        });

        //PUBLICADOS
        Schema::create('pub_analysis', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->dateTime('date')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->smallInteger('status')->default(1);
            $table->smallInteger('position')->default(0);
            $table->bigInteger('draft_id')->unsigned();
            $table->foreign('draft_id')->references('id')->on('dft_analysis')->onDelete('cascade');
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('restrict');
            $table->timestamps();
        });

        //IDIOMAS PUBLICADOS
        Schema::create('lng_pub_analysis', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title')->nullable();
            $table->string('teaser')->nullable();
            $table->text('description')->nullable();
            $table->string('lang', 6)->nullable();
            $table->bigInteger('publish_id')->unsigned();
            $table->foreign('publish_id')->references('id')->on('pub_analysis')->onDelete('cascade');
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
        Schema::dropIfExists('dft_analysis');
        Schema::dropIfExists('lng_dft_analysis');
        Schema::dropIfExists('pub_analysis');
        Schema::dropIfExists('lng_pub_analysis');
    }
}
