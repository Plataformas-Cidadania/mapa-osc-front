<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LngPubTeam extends Model
{
    protected $table = 'lng_pub_teams';

    protected $fillable = [
        'title', 'teaser', 'description', 'lang', 'publish_id'
    ];
}
