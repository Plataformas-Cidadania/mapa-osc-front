<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LngPubVersion extends Model
{
    protected $table = 'lng_pub_versions';

    protected $fillable = [
        'title', 'teaser', 'description', 'lang', 'publish_id'
    ];
}