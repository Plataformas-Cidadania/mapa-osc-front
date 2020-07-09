<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OscDadoGeral extends Model
{
    protected $connection= 'map';
    protected $table = "osc.tb_dados_gerais";
    public $timestamps = false;

    protected $fillable = [
        'id_osc', 'tx_sigla_osc', 'tx_razao_social_osc',
    ];
}


