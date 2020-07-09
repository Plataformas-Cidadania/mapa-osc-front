<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserCertificate extends Model
{
    protected $connection= 'map';
    protected $table = 'osc.tb_certificado';
    public $timestamps = false;

    protected $fillable = [
        'dt_inicio_certificado',
        'dt_fim_certificado',
        'cd_uf',
        'cd_certificado',
        'user_id',
    ];
}
