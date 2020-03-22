<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LngDftNew extends Model
{
    protected $table = 'lng_dft_news';

    protected $fillable = [
        'title', 'teaser', 'description', 'lang', 'draft_id'
    ];
}
