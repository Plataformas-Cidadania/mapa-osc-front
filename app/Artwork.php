<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Artwork extends Model
{
    protected $fillable = [
        'imagem', 'title', 'version', 'format', 'cmsuser_id', 'idioma_sigla',
    ];
}
