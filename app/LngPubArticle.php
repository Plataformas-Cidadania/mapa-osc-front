<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LngPubArticle extends Model
{
    protected $table = 'lng_pub_articles';

    protected $fillable = [
        'title', 'teaser', 'description', 'lang', 'publish_id'
    ];
}
