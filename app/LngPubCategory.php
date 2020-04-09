<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LngPubCategory extends Model
{
    protected $table = 'lng_pub_categories';

    protected $fillable = [
        'title', 'lang', 'publish_id'
    ];
}
