<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Popup extends Model
{
    protected $table = 'popups';

    protected $fillable = [
        'imagem', 'arquivo', 'titulo', 'descricao', 'url', 'status'
    ];
}
