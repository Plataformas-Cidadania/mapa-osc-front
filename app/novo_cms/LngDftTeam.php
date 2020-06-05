<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LngDftTeam extends Model
{
    protected $table = 'lng_dft_teams';

    protected $fillable = [
        'title', 'teaser', 'description', 'lang', 'draft_id'
    ];
}
