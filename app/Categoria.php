<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    protected $fillable = [
        'imagem', 'titulo', 'origin', 'cmsuser_id',
    ];
}
