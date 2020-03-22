<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LngDftVideo extends Model
{
    protected $table = 'lng_dft_videos';

    protected $fillable = [
        'title', 'teaser', 'description', 'lang', 'draft_id'
    ];
}
