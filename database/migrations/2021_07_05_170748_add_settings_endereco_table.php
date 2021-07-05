<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSettingsEnderecoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('settings', function (Blueprint $table) {
            $table->string('endereco_tutulo')->nullable();
            $table->string('endereco_tutulo2')->nullable();
            $table->string('endereco2')->nullable();
            $table->string('numero2')->nullable();
            $table->string('complemento2')->nullable();
            $table->string('bairro2')->nullable();
            $table->string('cidade2')->nullable();
            $table->string('estado2')->nullable();
            $table->string('cep2')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('settings', function (Blueprint $table) {
            //
        });
    }
}
