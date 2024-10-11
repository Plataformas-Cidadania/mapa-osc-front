<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chart extends Model
{
    protected $fillable = [
        'imagem', 'titulo', 'descricao', 'tipo', 'fonte', 'slug', 'status', 'tipo_nome', 'formato', 'chart_categoria_id', 'cmsuser_id',
    ];
}
