<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PubLink extends Model
{
    protected $table = 'pub_links';

    protected $fillable = [
        'draft_id', 'date', 'status',  'position',  'user_id', 'account_id'
    ];
}
