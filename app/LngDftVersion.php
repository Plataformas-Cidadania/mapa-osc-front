<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LngDftVersion extends Model
{
    protected $table = 'lng_dft_versions';

    protected $fillable = [
        'title', 'description', 'lang', 'draft_id'
    ];
}
