<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserConselho extends Model
{
    protected $connection= 'map';
    protected $table = 'osc.tb_conselho_fiscal';
    public $timestamps = false;

    protected $fillable = [
        'tx_nome_conselheiro',
    ];
}
