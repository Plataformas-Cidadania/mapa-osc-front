<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DftImage extends Model
{
    protected $table = 'dft_images';

    protected $fillable = [
        'type',  'image',  'origin',    'origin_id',    'lang',  'user_id', 'account_id'
    ];
}
