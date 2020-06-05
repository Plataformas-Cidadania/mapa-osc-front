<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LngDftArticle extends Model
{
    protected $table = 'lng_dft_articles';

    protected $fillable = [
        'title', 'teaser', 'description', 'lang', 'draft_id'
    ];
}
