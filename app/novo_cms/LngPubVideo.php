<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LngPubVideo extends Model
{
    protected $table = 'lng_pub_videos';

    protected $fillable = [
        'title', 'teaser', 'description', 'lang', 'publish_id'
    ];
}
