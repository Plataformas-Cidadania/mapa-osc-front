<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LngPubPublication extends Model
{
    protected $table = 'lng_pub_publications';

    protected $fillable = [
        'title', 'teaser', 'description', 'lang', 'publish_id'
    ];
}
