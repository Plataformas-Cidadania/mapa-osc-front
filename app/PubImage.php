<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PubImage extends Model
{
    protected $table = 'pub_images';

    protected $fillable = [
        'type',  'image',  'origin',    'origin_id',    'lang',  'user_id', 'account_id'
    ];
}
