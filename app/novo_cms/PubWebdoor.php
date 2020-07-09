<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PubWebdoor extends Model
{
    protected $table = 'pub_webdoors';

    protected $fillable = [
        'draft_id', 'url', 'status',  'position',  'user_id', 'account_id'
    ];
}
