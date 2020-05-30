<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PubArticle extends Model
{
    protected $table = 'pub_articles';

    protected $fillable = [
        'draft_id', 'date', 'status',  'position',  'user_id', 'account_id'
    ];
}
