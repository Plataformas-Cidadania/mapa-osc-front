<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PubSupport extends Model
{
    protected $table = 'pub_supports';

    protected $fillable = [
        'draft_id', 'url', 'status',  'position',  'user_id', 'account_id'
    ];
}
