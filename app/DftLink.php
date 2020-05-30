<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DftLink extends Model
{
    protected $table = 'dft_links';

    protected $fillable = [
        'draft_id', 'date', 'status',  'position',  'user_id', 'account_id'
    ];
}
