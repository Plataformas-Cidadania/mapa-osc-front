<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PubTeam extends Model
{
    protected $table = 'pub_teams';

    protected $fillable = [
        'draft_id', 'status',  'position',  'user_id', 'account_id'
    ];
}
