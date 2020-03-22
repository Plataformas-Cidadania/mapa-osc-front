<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dft_images', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('type')->nullable();
            $table->string('image')->nullable();
            $table->string('text')->nullable();
            $table->string('lang')->nullable();
            $table->string('origin')->nullable();
            $table->bigInteger('origin_id')->default(0);
            $table->timestamps();
        });

        Schema::create('pub_images', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('type')->nullable();
            $table->string('image')->nullable();
            $table->string('lang')->nullable();
            $table->string('origin')->nullable();
            $table->bigInteger('origin_id')->default(0);
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
        Schema::dropIfExists('dft_images');
        Schema::dropIfExists('pub_images');
    }
}
