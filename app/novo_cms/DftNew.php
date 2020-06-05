<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DftNew extends Model
{
    protected $table = 'dft_news';

    protected $fillable = [
        'draft_id', 'date', 'status',  'position',  'user_id', 'account_id'
    ];
}
