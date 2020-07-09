<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserGovernanca extends Model
{
    protected $connection= 'map';
    protected $table = 'osc.tb_governanca';
    public $timestamps = false;

    protected $fillable = [
        'tx_cargo_dirigente',
        'tx_nome_dirigente',
    ];
}
