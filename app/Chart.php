<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chart extends Model
{
    protected $fillable = [
        'imagem', 'titulo', 'descricao', 'tipo', 'fonte', 'slug', 'chart_categoria_id', 'cmsuser_id',
    ];
}
