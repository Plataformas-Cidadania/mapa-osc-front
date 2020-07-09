<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DftTeam extends Model
{
    protected $table = 'dft_teams';

    protected $fillable = [
        'draft_id', 'status',  'position',  'user_id', 'account_id'
    ];
}
