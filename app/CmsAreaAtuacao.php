<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CmsAreaAtuacao extends Model
{
    protected $connection = 'map';

    protected $table = 'syst.dc_area_atuacao';

    protected $primaryKey = 'cd_area_atuacao';

    public $timestamps = false;

    protected $fillable = [
        'tx_nome_area_atuacao',
    ];
}
