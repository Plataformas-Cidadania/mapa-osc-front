<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LngDftSupport extends Model
{
    protected $table = 'lng_dft_supports';

    protected $fillable = [
        'title', 'teaser', 'description', 'lang', 'draft_id'
    ];
}
