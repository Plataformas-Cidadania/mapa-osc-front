<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PubPublication extends Model
{
    protected $table = 'pub_publications';

    protected $fillable = [
        'draft_id', 'date', 'status',  'position',  'user_id', 'account_id'
    ];
}
