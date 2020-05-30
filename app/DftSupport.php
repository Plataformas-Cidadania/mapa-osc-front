<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DftSupport extends Model
{
    protected $table = 'dft_supports';

    protected $fillable = [
        'draft_id', 'url', 'status',  'position',  'user_id', 'account_id'
    ];
}
