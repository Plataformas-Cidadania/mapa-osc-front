<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PubNew extends Model
{
    protected $table = 'pub_news';

    protected $fillable = [
        'draft_id', 'date', 'status',  'position',  'user_id', 'account_id'
    ];
}
