<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChartCategoria extends Model
{
    protected $table = 'chart_categorias';

    protected $fillable = [
        'imagem', 'titulo', 'descricao', 'arquivo', 'posicao', 'cmsuser_id',
    ];

    public function charts()
    {
        return $this->hasMany(\App\Chart::class, 'chart_categoria_id');
    }
}
