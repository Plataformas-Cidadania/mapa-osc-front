<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LngPubWebdoor extends Model
{
    protected $table = 'lng_pub_webdoors';

    protected $fillable = [
        'title', 'teaser', 'description', 'lang', 'publish_id'
    ];
}
