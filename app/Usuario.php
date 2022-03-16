<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'portal.tb_usuario';
    public $timestamps = false;

    protected $fillable = [
        'cd_tipo_usuario',
        'tx_email_usuario',
        'tx_nome_usuario',
        'nr_cpf_usuario',
        'bo_lita_email',
        'bo_ativo',
        'dt_cadastro',
        'dt_atualizacao',
        'cd_municipio',
        'cd_uf',
        'bo_email_confirmado',
        'tx_telefone_1',
        'tx_telefone_2',
        'tx_orgao_trabalha',
        'tx_dado_institucional',
        'tx_email_confirmacao',
        'bo_lista_atualizacao_anual',
        'bo_lista_atualizacao_trimestral',
        'tx_hash_ativacao_usuario',
    ];
}
