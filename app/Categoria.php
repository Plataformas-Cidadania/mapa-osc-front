<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    protected $fillable = [
        'imagem', 'titulo', 'origin', 'midia_id', 'cmsuser_id',
    ];
}
