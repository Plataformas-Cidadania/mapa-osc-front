<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DftWebdoor extends Model
{
    protected $table = 'dft_webdoors';

    protected $fillable = [
        'draft_id', 'url', 'status',  'position',  'user_id', 'account_id'
    ];
}
