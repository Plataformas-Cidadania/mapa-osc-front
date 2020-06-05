<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LngDftPage extends Model
{
    protected $table = 'lng_dft_pages';

    protected $fillable = [
        'title', 'teaser', 'description', 'lang', 'draft_id'
    ];
}
