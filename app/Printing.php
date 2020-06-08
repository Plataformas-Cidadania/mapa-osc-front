<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Printing extends Model
{
    protected $fillable = [
        'imagem', 'type', 'title', 'description', 'arquivo', 'cmsuser_id',
    ];
}
