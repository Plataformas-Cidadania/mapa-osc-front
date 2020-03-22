<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LngDftAnalyze extends Model
{
    protected $table = 'lng_dft_analises';

    protected $fillable = [
        'title', 'teaser', 'description', 'lang', 'draft_id'
    ];
}
