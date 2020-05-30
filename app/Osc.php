<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Osc extends Model{

    protected $fillable = [
        'title',  'cnpj', 'legal_nature', 'description',
    ];
}
