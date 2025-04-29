<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Termo extends Model
{
    protected $table = 'portal.tb_termo'; // Nome completo com schema

    protected $primaryKey = 'id_termo'; // Caso não seja "id", defina a chave primária

    public $timestamps = false; // Se a tabela não tiver created_at / updated_at

    protected $fillable = [
        'id_termo', 'tx_nome',
    ];
}
