<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LngPubNew extends Model
{
    protected $table = 'lng_pub_news';

    protected $fillable = [
        'title', 'teaser', 'description', 'lang', 'publish_id'
    ];
}
