<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LngPubAnalyze extends Model
{
    protected $table = 'lng_pub_analises';

    protected $fillable = [
        'title', 'teaser', 'description', 'lang', 'publish_id'
    ];
}
