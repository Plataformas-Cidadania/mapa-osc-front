<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LngDftCategory extends Model
{
    protected $table = 'lng_dft_categories';

    protected $fillable = [
        'title', 'lang', 'draft_id'
    ];
}
