<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DftVersion extends Model
{
    protected $table = 'dft_versions';

    protected $fillable = [
        'draft_id', 'date', 'status',  'position',  'user_id', 'account_id'
    ];
}
