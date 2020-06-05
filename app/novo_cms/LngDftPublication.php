<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LngDftPublication extends Model
{
    protected $table = 'lng_dft_publications';

    protected $fillable = [
        'title', 'teaser', 'description', 'lang', 'draft_id'
    ];
}
