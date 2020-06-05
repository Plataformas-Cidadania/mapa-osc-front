<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LngDftLink extends Model
{
    protected $table = 'lng_dft_links';

    protected $fillable = [
        'title', 'description', 'lang', 'draft_id'
    ];
}
