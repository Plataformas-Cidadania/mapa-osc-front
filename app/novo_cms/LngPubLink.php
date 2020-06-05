<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LngPubLink extends Model
{
    protected $table = 'lng_pub_links';

    protected $fillable = [
        'title', 'description', 'lang', 'publish_id'
    ];
}
