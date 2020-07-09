<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Directive extends Model
{
    protected $fillable = [
        'imagem', 'type', 'title', 'description', 'cmsuser_id', 'idioma_sigla',
    ];
}
