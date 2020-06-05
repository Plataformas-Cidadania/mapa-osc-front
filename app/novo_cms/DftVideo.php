<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DftVideo extends Model
{
    protected $table = 'dft_videos';

    protected $fillable = [
        'draft_id', 'url', 'date', 'status',  'position',  'user_id', 'account_id'
    ];
}
