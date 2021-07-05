<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'imagem', 'email', 'titulo', 'rodape', 'cep', 'endereco', 'numero', 'complemento', 'bairro', 'cidade', 'estado', 'descricao_contato', 'telefone', 'telefone2', 'telefone3', 'facebook', 'youtube', 'pinterest', 'twitter', 'blog', 'instagram',
        'endereco_tutulo', 'endereco_tutulo2', 'cep2', 'endereco2', 'numero2', 'complemento2', 'bairro2', 'cidade2', 'estado2',
    ];
}
