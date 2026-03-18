<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTipoWebdoorsTable extends Migration
{
    public function up()
    {
        Schema::table('webdoors', function (Blueprint $table) {
            $table->smallInteger('tipo')->default(0);
        });
    }

    public function down()
    {
        Schema::table('webdoors', function (Blueprint $table) {
            $table->dropColumn('tipo');
        });
    }
}
