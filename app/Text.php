<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Text extends Model
{
    protected $fillable = [
        'imagem', 'titulo', 'descricao', 'slug', 'cmsuser_id',
    ];
}
