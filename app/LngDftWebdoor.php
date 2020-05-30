<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LngDftWebdoor extends Model
{
    protected $table = 'lng_dft_webdoors';

    protected $fillable = [
        'title', 'teaser', 'description', 'lang', 'draft_id'
    ];
}
