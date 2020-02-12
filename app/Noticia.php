<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Noticia extends Model{

    protected  $table = "cmsosc.noticias";

    protected $fillable = [
        'imagem', 'origem_id', 'titulo', 'descricao', 'autor', 'fonte', 'url', 'link', 'arquivo', 'legenda', 'cmsuser_id', 'idioma_sigla',
    ];
}
