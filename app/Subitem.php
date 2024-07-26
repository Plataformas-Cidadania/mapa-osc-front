<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subitem extends Model
{
    protected $fillable = [
        'imagem', 'titulo', 'descricao', 'arquivo', 'item_id', 'posicao', 'video', 'url', 'cmsuser_id',
    ];
}
