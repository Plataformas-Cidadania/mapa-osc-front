<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PubVersion extends Model
{
    protected $table = 'pub_versions';

    protected $fillable = [
        'draft_id', 'date', 'status',  'position',  'user_id', 'account_id'
    ];
}
