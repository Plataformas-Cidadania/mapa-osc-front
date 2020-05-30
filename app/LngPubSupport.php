<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LngPubSupport extends Model
{
    protected $table = 'lng_pub_supports';

    protected $fillable = [
        'title', 'teaser', 'description', 'lang', 'publish_id'
    ];
}
