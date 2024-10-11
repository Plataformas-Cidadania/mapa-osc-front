<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddChartsStatusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('charts', function (Blueprint $table) {
            $table->integer('status')->default(0);
            $table->string('tipo_nome')->nullable();
            $table->string('formato')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('charts', function (Blueprint $table) {
            //
        });
    }
}
