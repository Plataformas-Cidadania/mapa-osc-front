<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DftArticle extends Model
{
    protected $table = 'dft_articles';

    protected $fillable = [
        'draft_id', 'date', 'status',  'position',  'user_id', 'account_id'
    ];
}
