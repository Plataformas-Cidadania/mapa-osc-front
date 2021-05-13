<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'imagem', 'titulo', 'resumida', 'descricao', 'arquivo', 'data', 'categoria_id', 'cmsuser_id',
    ];
}
