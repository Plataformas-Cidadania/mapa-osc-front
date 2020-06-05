<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PubCategory extends Model
{
    protected $table = 'pub_categories';

    protected $fillable = [
        'draft_id', 'status',  'position',  'origin',  'origin_id',  'user_id', 'account_id'
    ];
}
