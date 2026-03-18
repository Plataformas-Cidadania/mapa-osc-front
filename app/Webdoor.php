<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Webdoor extends Model
{
    protected $fillable = [
        'imagem', 'titulo', 'descricao', 'link', 'legenda', 'posicao',  'tipo', 'cmsuser_id',
    ];
}
