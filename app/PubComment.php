<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PubComment extends Model
{
    protected $table = 'pub_comments';

    protected $fillable = [
        'name', 'email',  'description',  'answer',  'status',  'origin',  'origin_id',  'user_id', 'account_id'
    ];
}
