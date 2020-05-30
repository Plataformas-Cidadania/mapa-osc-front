<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PubAnalyze extends Model
{
    protected $table = 'pub_analises';

    protected $fillable = [
        'draft_id', 'date', 'status',  'position',  'user_id', 'account_id'
    ];
}
