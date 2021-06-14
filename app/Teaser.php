<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Teaser extends Model
{
    protected $fillable = [
        'imagem', 'titulo', 'teaser', 'descricao', 'url', 'posicao', 'cmsuser_id',
    ];
}
