<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PubVideo extends Model
{
    protected $table = 'pub_videos';

    protected $fillable = [
        'draft_id', 'url', 'date', 'status',  'position',  'user_id', 'account_id'
    ];
}
