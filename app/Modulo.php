<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Modulo extends Model
{
    protected $fillable = [
        'imagem', 'titulo', 'descricao', 'arquivo', 'slug', 'tipo_id', 'show', 'cmsuser_id',
    ];
}
